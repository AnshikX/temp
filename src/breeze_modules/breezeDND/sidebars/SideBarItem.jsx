import { useCallback, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import "../styles.css";
import upArrow from "../assets/svgs/up-arrow.svg";
import downArrow from "../assets/svgs/down-arrow.svg";
import { generateIdFromTemplate } from "../utils/generateIds";

const SideBarItem = ({ sidebarItems, theme }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLibs, setExpandedLibs] = useState({});
  const [libComponents, setLibComponents] = useState({});

  const [openSections, setOpenSections] = useState({
    html: false,
    components: false,
    third_party: false,
    widgets: true,
  });
  console.log(sidebarItems);
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleLibrary = async (libNameWithVersion) => {
    setExpandedLibs((prev) => ({
      ...prev,
      [libNameWithVersion]: !prev[libNameWithVersion],
    }));
    if (!libComponents[libNameWithVersion]) {
      window.parent.postMessage(
        {
          source: "APP",
          action: "FETCH_THIRD_PARTY_COMPONENTS",
          payload: { libName: libNameWithVersion },
        },
        "*"
      );
    }
  };

  const filterItems = (items) => {
    return items.filter((item) =>
      item.label?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.source === "BREEZE") {
        const { resource } = event.data;

        if (resource?.type === "third_party") {
          const grouped = {};

          resource.third_party.forEach((entry) => {
            const { libName, mostUsed = [], allComponents = [] } = entry;
            grouped[libName] = { mostUsed, allComponents };
          });

          setLibComponents((prev) => ({
            ...prev,
            ...grouped,
          }));
        }
        console.log(libComponents, "libComponents");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [libComponents]);

  const filteredHtmlItems = filterItems(sidebarItems.htmlItems);
  const filteredComponents = filterItems(sidebarItems.components);
  const filteredWidgets = filterItems(sidebarItems.widgets);
  const filteredLibs = sidebarItems.third_party.filter((lib) =>
    lib.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLibName = (libName) => {
    if (!libName) return "";
    const [name] = libName.split("@");
    if (!name || name.length === 0) return libName;
    return name[0].toUpperCase() + name.slice(1);
  };

  return (
    <div className={`brDnd-sidebar ${theme === "dark" ? "dark" : "light"}`}>
      <div className="brDnd-search-container mb-2">
        <input
          type="text"
          className={`brDnd-search-bar ${theme === "dark" ? "dark" : "light"}`}
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* HTML Elements */}
      <SidebarSection
        title="HTML Elements"
        open={openSections.html}
        toggle={() => toggleSection("html")}
        items={filteredHtmlItems}
        theme={theme}
      />

      {/* Components */}
      <SidebarSection
        title="Components"
        open={openSections.components}
        toggle={() => toggleSection("components")}
        items={filteredComponents}
        theme={theme}
      />

      {/* Third Party */}
      <div className="mb-2 mt-3">
        <span
          onClick={() => toggleSection("third_party")}
          className="brDnd-section-title"
        >
          Third Party
          {openSections.third_party ? (
            <img src={upArrow} alt="expand" />
          ) : (
            <img src={downArrow} alt="collapse" />
          )}
        </span>

        {openSections.third_party && (
          <div className="brDnd-section-content">
            {filteredLibs.length > 0 ? (
              filteredLibs.map((libName) => (
                <div key={libName}>
                  <div
                    className="cursor-pointer font-semibold py-1 d-flex justify-content-between"
                    onClick={() => toggleLibrary(libName)}
                  >
                    <span>{formatLibName(libName)}</span>
                    <img
                      src={expandedLibs[libName] ? upArrow : downArrow}
                      className="inline ml-2"
                      alt="toggle"
                    />
                  </div>

                  {expandedLibs[libName] && (
                    <div className="ml-4">
                      {libComponents[libName] ? (
                        <>
                          {libComponents[libName].mostUsed?.length > 0 && (
                            <>
                              <div className="font-semibold text-sm">
                                Most Used (
                                {libComponents[libName].mostUsed.length})
                              </div>
                              {libComponents[libName].mostUsed.map(
                                (item, idx) => (
                                  <DraggableItem
                                    key={`most-${idx}`}
                                    data={item}
                                    theme={theme}
                                  />
                                )
                              )}
                            </>
                          )}

                          {libComponents[libName].allComponents?.length > 0 && (
                            <>
                              <div className="font-semibold text-sm mt-3">
                                All Components (
                                {libComponents[libName].allComponents.length})
                              </div>
                              {libComponents[libName].allComponents.map(
                                (item, idx) => (
                                  <DraggableItem
                                    key={`all-${idx}`}
                                    data={item}
                                    theme={theme}
                                  />
                                )
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <div className="text-sm italic text-gray-500">
                          Loading...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="fst-italic fs-6">No third-party libraries</div>
            )}
          </div>
        )}
      </div>

      {/* Widgets */}
      <SidebarSection
        title="Widget Elements"
        open={openSections.widgets}
        toggle={() => toggleSection("widgets")}
        items={filteredWidgets}
        theme={theme}
      />
    </div>
  );
};

const SidebarSection = ({ title, open, toggle, items, theme }) => (
  <div className="mb-2 mt-3">
    <span onClick={toggle} className="brDnd-section-title">
      {title}
      {open ? (
        <img src={upArrow} alt="expand" />
      ) : (
        <img src={downArrow} alt="collapse" />
      )}
    </span>
    {open && (
      <div className="brDnd-section-content">
        {items.length > 0 ? (
          items.map((item, index) => (
            <DraggableItem key={index} data={item} theme={theme} />
          ))
        ) : (
          <div className="fst-italic fs-6">No results</div>
        )}
      </div>
    )}
  </div>
);

const DraggableItem = ({ data, theme }) => {
  const getItem = useCallback(() => generateIdFromTemplate(data), [data]);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "HTML",
      item: { getItem },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [data]
  );

  return (
    <div
      className={`brDnd-sideBarItem ${theme === "dark" ? "dark" : "light"}`}
      ref={drag}
      style={{ opacity }}
    >
      {data.label}
    </div>
  );
};

DraggableItem.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
};

SidebarSection.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
};

SideBarItem.propTypes = {
  sidebarItems: PropTypes.shape({
    htmlItems: PropTypes.array.isRequired,
    components: PropTypes.array.isRequired,
    third_party: PropTypes.array.isRequired,
    widgets: PropTypes.array.isRequired,
  }).isRequired,
  theme: PropTypes.string.isRequired,
};

export default SideBarItem;
