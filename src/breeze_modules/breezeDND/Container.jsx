import { useState, useEffect, useRef } from "react";
import SideBarItem from "./sidebars/SideBarItem";
import "./styles/Container.css";
import { useSetters } from "./contexts/SelectionContext";
import Layers from "./sidebars/Layers";
import SidebarNavItem from "./sidebars/SidebarNavItem";
import { useMetaConfig } from "./contexts/MetaConfigContext";
import { asClient, asFrameHost } from "./postMessageBridge";

const Container = () => {
  const config = useRef({});
  const [sidebarItems, setSidebarItems] = useState({
    htmlItems: [],
    components: [],
    third_party: [],
    widgets: [],
    breeze_components: [],
    breeze_templates: [],
  });
  const [activeSidebarView, setActiveSidebarView] = useState("layers");
  const [isPreview, setIsPreview] = useState(false);
  const [compName, setCompName] = useState(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const { setSelectedItemId } = useSetters();
  const { setFullMetaConfig } = useMetaConfig();
  const trigger = useState(0)[1];

  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const pageContainerRef = useRef(null);
  const sidebarWidthRef = useRef(250);
  const iframe2Ref = useRef(null);

  // Initialize asClient and handle incoming messages
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [component, sidebar, theme] = await Promise.all([
          asClient.sendRequest("componentConfig"),
          asClient.sendRequest("sidebarItems"),
          asClient.sendRequest("theme"),
        ]);

        if (component) {
          config.current = component.component;
          setFullMetaConfig(component.fullMetaConfig);
          setCompName(component.compName);
          trigger((x) => x + 1);
        }

        if (sidebar) {
          setSidebarItems(sidebar.sidebarItems);
        }

        if (theme) {
          Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
          });
        }
      } catch (err) {
        console.error("Failed to load initial data via asClient:", err);
      }
    };

    loadInitialData();
  }, [setSidebarItems, trigger, setFullMetaConfig]);

  // Handling iframe to iframe communication
  useEffect(() => {
    asFrameHost.registerHandler("config", () => {
      return config.current;
    });

    asFrameHost.registerHandler("UPDATE_CUSTOM_CONFIG", ({ newTree }) => {
      config.current = newTree;
      asClient.sendEvent("UPDATED_CONFIG_TO_HOST", { customConfig: newTree });
      trigger((x) => x + 1);
    });

    return () => {
      asFrameHost.removeHandler("config");
      asFrameHost.removeHandler("UPDATE_CUSTOM_CONFIG");
    };
  }, [trigger]);

  useEffect(() => {
    const handleThemeChange = (theme) => {
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    };

    asClient.on("theme", handleThemeChange);
    return () => {
      asClient.off("theme", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !(
          document
            .querySelector(".brDnd-rightSidebar")
            ?.contains(event.target) ||
          document.querySelector(".brDnd-sidebar")?.contains(event.target) ||
          document.getElementById("toolBar").contains(event.target)
        )
      ) {
        setSelectedItemId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setSelectedItemId]);

  useEffect(() => {
    const func = (item) => {
      asFrameHost.sendEvent("updateItemConfig", item);
      console.log(item);
    };

    const func2 = async (item) => {
      return await asClient.sendRequest("FETCH_CONFIG", item);
    };

    const func3 = (config) => {
      console.log("Received widgetConfig from Breeze", config);
      asFrameHost.sendEvent("widgetConfig", config);
    };

    asFrameHost.registerHandler("FETCH_CONFIG", func2);

    asClient.on("updateItemConfig", func);
    asClient.registerHandler("widgetConfig", func3);

    return () => {
      asClient.off("updateItemConfig", func);
      asFrameHost.removeHandler("FETCH_CONFIG");
      asClient.removeHandler("widgetConfig", func3);
    };
  }, []);

  useEffect(() => {
    asFrameHost.on("UNDO_REDO_STATUS", ({ canUndo, canRedo }) => {
      setCanUndo(canUndo);
      setCanRedo(canRedo);
    });
    return () => {
      asFrameHost.off("UNDO_REDO_STATUS", ({ canUndo, canRedo }) => {
        setCanUndo(canUndo);
        setCanRedo(canRedo);
      });
    };
  }, []);

  const toggle = () => {
    asClient?.sendRequest("TOGGLE_SIDEBAR");
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(Math.max(e.clientX, 150), 600);
    sidebarWidthRef.current = newWidth;
    iframe2Ref.current.style.pointerEvents = "none";
    if (sidebarRef.current && pageContainerRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      pageContainerRef.current.style.width = `calc(100% - ${newWidth + 6}px)`;
    }
  };

  const startResizing = () => {
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";

    sidebarRef.current?.classList.add("no-transition");
    pageContainerRef.current?.classList.add("no-transition");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const stopResizing = () => {
    isResizingRef.current = false;
    document.body.style.cursor = "default";

    iframe2Ref.current.style.pointerEvents = "";
    sidebarRef.current?.classList.remove("no-transition");
    pageContainerRef.current?.classList.remove("no-transition");

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  const shouldAnimateSidebar =
    !isResizingRef.current && !isPreview && sidebarWidthRef.current > 0;

  return (
    <div className="brDnd-body">
      <div style={{ backgroundColor: "var(--brDnd-color-secondary)" }}>
        <div
          ref={sidebarRef}
          className={`brDnd-sidebar brDnd-background-primary brDnd-color-text ${
            isPreview ? "brDnd-hidden" : "hide-scrollbar"
          }`}
          style={{
            width: isPreview ? 0 : `${sidebarWidthRef.current}px`,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className="d-flex p-2">
            <SidebarNavItem
              icon="bi bi-layers"
              label="Layers"
              selected={activeSidebarView === "layers"}
              onClick={() => setActiveSidebarView("layers")}
            />
            <SidebarNavItem
              icon="bi bi-plus-circle"
              label="Add Element"
              selected={activeSidebarView === "add-element"}
              onClick={() => setActiveSidebarView("add-element")}
            />
          </div>

          <div className="overflow-auto">
            {activeSidebarView === "add-element" ? (
              <SideBarItem
                sidebarItems={sidebarItems}
                shouldAnimateSidebar={shouldAnimateSidebar}
                isResizingRef={isResizingRef}
              />
            ) : (
              <div className="p-2">
                <Layers
                  compName={compName}
                  treeExpanded
                  node={config.current}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="brDnd-resizer"
        onMouseDown={!isPreview ? startResizing : undefined}
        style={{ display: isPreview ? "none" : "block" }}
      />

      <div
        ref={pageContainerRef}
        className="brDnd-pageContainer"
        style={{
          width: isPreview
            ? "100%"
            : `calc(100% - ${sidebarWidthRef.current + 6}px)`,
        }}
      >
        <div
          className="brDnd-shortcutBar brDnd-background-secondary brDnd-color-text"
          id="toolBar"
        >
          <div
            className={`${
              isPreview ? "brDnd-hidden" : ""
            } d-flex align-items-center`}
          >
            {/* Undo */}
            <div
              onClick={() => canUndo && asFrameHost.sendEvent("UNDO_CHANGES")}
              className={`mx-2 ${canUndo ? "text-primary" : "text-secondary"}`}
              style={{
                cursor: canUndo ? "pointer" : "not-allowed",
                opacity: canUndo ? 1 : 0.5,
                fontSize: "1.5rem",
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </div>

            {/* Redo */}
            <div
              onClick={() => canRedo && asFrameHost.sendEvent("REDO_CHANGES")}
              className={`mx-2 ${canRedo ? "text-success" : "text-secondary"}`}
              style={{
                cursor: canRedo ? "pointer" : "not-allowed",
                opacity: canRedo ? 1 : 0.5,
                fontSize: "1.5rem",
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </div>
          </div>

          <div className="brDnd-toggleButtonContainer">
            <button
              className="brDnd-toggleButton"
              onClick={() => {
                setIsPreview((prev) => !prev);
                asFrameHost.sendEvent("TOGGLE_PREVIEW", { isPreview });
                toggle();
              }}
            >
              {isPreview ? "Edit" : "Finish Editing"}
            </button>
          </div>
        </div>
        <div className="brDnd-page" id="page">
          {config.current && config.current.elementType ? (
            <iframe
              src="/breeze/renderer-frame"
              id="config-renderer-iframe"
              ref={iframe2Ref}
              title="Renderer Frame"
              width="100%"
              height="100%"
              onLoad={() => {
                asFrameHost.setTargetWindow(iframe2Ref.current?.contentWindow);
              }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
