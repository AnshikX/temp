import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import "../styles.css";
import upArrow from "../assets/svgs/up-arrow.svg";
import downArrow from "../assets/svgs/down-arrow.svg";
import { DraggableItem } from "./DraggableItem";
import { SidebarSection } from "./SidebarSection";
const filterItems = (items, searchQuery) => {
  return items.filter((item) =>
    item.label?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
};

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

  const filteredHtmlItems = useMemo(
    () => filterItems(sidebarItems.htmlItems, searchQuery),
    [sidebarItems.htmlItems, searchQuery]
  );
  const filteredComponents = useMemo(
    () => filterItems(sidebarItems.components, searchQuery),
    [sidebarItems.components, searchQuery]
  );
  const filteredWidgets = useMemo(
    () => filterItems(sidebarItems.widgets, searchQuery),
    [sidebarItems.widgets, searchQuery]
  );

  const filteredLibs = useMemo(() => {
    if (searchQuery.trim() === "") return sidebarItems.third_party;
    return sidebarItems.third_party.filter((libName) => {
      const components = libComponents[libName];
      if (!components) return false;

      const allLabels = [
        ...(components?.mostUsed || []),
        ...(components?.allComponents || []),
      ];

      return allLabels.some((comp) =>
        comp.label?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [sidebarItems.third_party, libComponents, searchQuery]);

  const lengths = useRef({
    html: filteredHtmlItems.length,
    components: filteredComponents.length,
    third_party: filteredLibs.length,
    widgets: filteredWidgets.length,
  });

  useEffect(() => {
    lengths.current = {
      html: filteredHtmlItems.length,
      components: filteredComponents.length,
      third_party: filteredLibs.length,
      widgets: filteredWidgets.length,
    };
  }, [filteredHtmlItems, filteredComponents, filteredLibs, filteredWidgets]);

  const formatLibName = (libName) => {
    if (!libName) return "";

    // Remove version (@latest, @5.0.0, etc.)
    const [nameWithScope] = libName.split("@").filter(Boolean); // skip empty string before @

    // Handle scoped packages like @mui/private-theming
    const parts = nameWithScope.split("/");
    const first = parts[0];
    const rest = parts.slice(1).join("/");

    const formattedFirst = first.charAt(0).toUpperCase() + first.slice(1);

    return rest ? `${formattedFirst}/${rest}` : formattedFirst;
  };

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
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [libComponents]);

  useEffect(() => {
    const shouldOpen = {};

    if (searchQuery.trim() !== "") {
      if (lengths.current.html > 0) shouldOpen.html = true;
      if (lengths.current.components > 0) shouldOpen.components = true;
      if (lengths.current.widgets > 0) shouldOpen.widgets = true;
      if (lengths.current.third_party > 0) shouldOpen.third_party = true;
    }

    if (Object.keys(shouldOpen).length > 0) {
      setOpenSections((prev) => ({
        ...prev,
        ...shouldOpen,
      }));
    }
  }, [searchQuery]);

  return (
    <div
      className={`brDnd-sidebar ${
        theme === "dark" ? "dark" : "light"
      } hide-scrollbar`}
    >
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
          className={`brDnd-section-title ${
            theme === "dark" ? "dark" : "light"
          }`}
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
                              <div className="font-semibold text-sm d-flex justify-content-between">
                                <span> Most Used</span>
                                <span className="pill">
                                  {libComponents[libName].mostUsed.length}
                                </span>
                              </div>
                              <div className="brDnd-cardGrid">
                                {libComponents[libName].mostUsed
                                  .filter((item) =>
                                    item.label
                                      ?.toLowerCase()
                                      .includes(searchQuery.toLowerCase())
                                  )
                                  .map((item, idx) => (
                                    <DraggableItem
                                      key={`most-${idx}`}
                                      data={{ ...item }}
                                      theme={theme}
                                    />
                                  ))}
                              </div>
                            </>
                          )}

                          {libComponents[libName].allComponents?.length > 0 && (
                            <>
                              <div className="font-semibold text-sm mt-3 d-flex justify-content-between">
                                <span> All Components</span>
                                <span className="pill">
                                  {libComponents[libName].allComponents.length}
                                </span>
                              </div>
                              <div className="brDnd-cardGrid">
                                {libComponents[libName].allComponents
                                  .filter((item) =>
                                    item.label
                                      ?.toLowerCase()
                                      .includes(searchQuery.toLowerCase())
                                  )
                                  .map((item, idx) => (
                                    <DraggableItem
                                      key={`all-${idx}`}
                                      data={{ ...item }}
                                      theme={theme}
                                    />
                                  ))}
                              </div>
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
