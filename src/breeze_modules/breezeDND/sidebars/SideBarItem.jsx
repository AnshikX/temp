import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import upArrow from "../assets/svgs/up-arrow.svg";
import downArrow from "../assets/svgs/down-arrow.svg";
import { DraggableItem } from "./DraggableItem";
import { SidebarSection } from "./SidebarSection";
import "../styles/Sidebar.css";
import { asClient } from "../postMessageBridge";

const filterItems = (items, searchQuery) => {
  return items.filter((item) =>
    item.label?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
};

const SideBarItem = ({ sidebarItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLibs, setExpandedLibs] = useState({});
  const [libComponents, setLibComponents] = useState({});
  const toggleButtonRef = useRef(null);
  const [openSections, setOpenSections] = useState({
    html: false,
    components: false,
    third_party: false,
    widgets: false,
    breeze_components: false,
    breeze_templates: true,
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
  const filteredBreezeComponents = useMemo(
    () => filterItems(sidebarItems.breeze_components, searchQuery),
    [sidebarItems.breeze_components, searchQuery]
  );
  const filteredBreezeTemplates = useMemo(
    () => filterItems(sidebarItems.breeze_templates, searchQuery),
    [sidebarItems.breeze_templates, searchQuery]
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
    breeze_components: filteredBreezeComponents.length,
    breeze_templates: filteredBreezeTemplates.length,
  });

  useEffect(() => {
    lengths.current = {
      html: filteredHtmlItems.length,
      components: filteredComponents.length,
      third_party: filteredLibs.length,
      widgets: filteredWidgets.length,
      breeze_components: filteredBreezeComponents.length,
      breeze_templates: filteredBreezeTemplates.length,
    };
  }, [
    filteredHtmlItems,
    filteredComponents,
    filteredLibs,
    filteredWidgets,
    filteredBreezeComponents,
    filteredBreezeTemplates,
  ]);

  const formatLibName = (libName) => {
    if (!libName) return "";
    const [nameWithScope] = libName.split("@").filter(Boolean);
    const parts = nameWithScope.split("/");
    const first = parts[0];
    const rest = parts.slice(1).join("/");
    const formattedFirst = first.charAt(0).toUpperCase() + first.slice(1);
    return rest ? `${formattedFirst}/${rest}` : formattedFirst;
  };

  const handleTileClick = () => {
    toggleButtonRef.current?.click();
  };

  const toggleLibrary = async (libNameWithVersion) => {
    setExpandedLibs((prev) => ({
      ...prev,
      [libNameWithVersion]: !prev[libNameWithVersion],
    }));

    if (!libComponents[libNameWithVersion]) {
      try {
        const result = await asClient.sendRequest(
          "FETCH_THIRD_PARTY_COMPONENTS",
          {
            libName: libNameWithVersion,
          }
        );

        if (result?.third_party) {
          const grouped = {};
          result.third_party.forEach(
            ({ libName, mostUsed = [], allComponents = [] }) => {
              grouped[libName] = { mostUsed, allComponents };
            }
          );
          setLibComponents((prev) => ({ ...prev, ...grouped }));
        }
      } catch (err) {
        console.error("Failed to fetch third-party lib components:", err);
      }
    }
  };

  useEffect(() => {
    const shouldOpen = {};
    if (searchQuery.trim() !== "") {
      if (lengths.current.html > 0) shouldOpen.html = true;
      if (lengths.current.components > 0) shouldOpen.components = true;
      if (lengths.current.widgets > 0) shouldOpen.widgets = true;
      if (lengths.current.breeze_components > 0)
        shouldOpen.breeze_components = true;
      if (lengths.current.breeze_templates > 0)
        shouldOpen.breeze_templates = true;
    }
    if (Object.keys(shouldOpen).length > 0) {
      setOpenSections((prev) => ({ ...prev, ...shouldOpen }));
    }
  }, [searchQuery]);

  return (
    <div className="p-2">
      <div className="brDnd-sidebar-search mb-2">
        <input
          type="text"
          className="form-control form-control-sm left-side"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="accordion" id="sidebarAccordion">
        <SidebarSection
          title="HTML Elements"
          open={openSections.html}
          items={filteredHtmlItems}
        />
        <SidebarSection
          title="Components"
          open={openSections.components}
          items={filteredComponents}
        />

        <div
          className="mb-2 accordion-item brDnd-background-primary brDnd-color-text"
          style={{ border: "none" }}
        >
          <div
            className="rounded accordion-header"
            id="heading-third-party"
            onClick={handleTileClick}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex justify-content-between align-items-center p-2">
              <span className="fw-medium" style={{ fontSize: "14px" }}>
                Third Party
              </span>
              <div className="d-flex align-items-center">
                <button
                  ref={toggleButtonRef}
                  className="accordion-button collapsed p-0 border-0 bg-transparent shadow-none custom-arrow-size"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-third-party"
                  aria-expanded={openSections.third_party}
                  aria-controls="collapse-third-party"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>

          <div
            id="collapse-third-party"
            className={`accordion-collapse collapse ${
              openSections.third_party ? "show" : ""
            }`}
            aria-labelledby="heading-third-party"
          >
            <div className="accordion-body p-1">
              {filteredLibs.length > 0 ? (
                filteredLibs.map((libName) => (
                  <div key={libName}>
                    <div
                      className="font-semibold py-1 d-flex justify-content-between"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleLibrary(libName)}
                    >
                      <span>{formatLibName(libName)}</span>
                      {/* <img
                        src={expandedLibs[libName] ? upArrow : downArrow}
                        className="inline ml-2"
                        alt="toggle"
                      /> */}
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
                                  <span>Most Used</span>
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
                                      />
                                    ))}
                                </div>
                              </>
                            )}

                            {libComponents[libName].allComponents?.length >
                              0 && (
                              <>
                                <div className="font-semibold text-sm mt-3 d-flex justify-content-between">
                                  <span>All Components</span>
                                  <span className="pill">
                                    {
                                      libComponents[libName].allComponents
                                        .length
                                    }
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
          </div>
        </div>

        <SidebarSection
          title="Widget Elements"
          open={openSections.widgets}
          items={filteredWidgets}
        />
        <SidebarSection
          title="Breeze Components"
          open={openSections.breeze_components}
          items={filteredBreezeComponents}
        />
        <SidebarSection
          title="Breeze Templates"
          open={openSections.breeze_templates}
          items={filteredBreezeTemplates}
        />
      </div>
    </div>
  );
};

SideBarItem.propTypes = {
  sidebarItems: PropTypes.shape({
    htmlItems: PropTypes.array.isRequired,
    components: PropTypes.array.isRequired,
    third_party: PropTypes.array.isRequired,
    widgets: PropTypes.array.isRequired,
    breeze_components: PropTypes.array.isRequired,
    breeze_templates: PropTypes.array,
  }).isRequired,
};

export default SideBarItem;
