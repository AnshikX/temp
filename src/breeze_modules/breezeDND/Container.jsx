import { useState, useEffect, useRef, useCallback } from "react";
import SideBarItem from "./sidebars/SideBarItem";
import Renderer from "./Renderer";
import "./styles/Container.css";
import { useSetters } from "./contexts/SelectionContext";
import { usePushChanges, useUndoRedo } from "./contexts/UndoRedoContext";
import undoButton from "./assets/svgs/undo-button.svg";
import redoButton from "./assets/svgs/redo-button.svg";
import Layers from "./sidebars/Layers";
import SidebarNavItem from "./sidebars/SidebarNavItem";
import deepCopy from "../utils/deepcopy";
import { useMetaConfig } from "./contexts/MetaConfigContext";

const Container = () => {
  const config = useRef({});
  const [sidebarItems, setSidebarItems] = useState({
    htmlItems: [],
    components: [],
    third_party: [],
    widgets: [],
  });
  const [activeSidebarView, setActiveSidebarView] = useState("layers");
  const [isPreview, setIsPreview] = useState(false);
  const [compName, setCompName] = useState(null);

  const { pushChanges } = usePushChanges();
  const { setSelectedItemId } = useSetters();
  const { setFullMetaConfig } = useMetaConfig();
  const { undoChanges, redoChanges, undoStack, redoStack } = useUndoRedo();
  const trigger = useState(0)[1];

  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const pageContainerRef = useRef(null);
  const sidebarWidthRef = useRef(250);

  useEffect(() => {
    const handleMessage = (event) => {
      // eslint-disable-next-line no-constant-condition
      if (event.origin === "http://localhost:3000" || true) {
        const { type } = event.data;
        if (type === "resource") {
          const resource = event.data.resource;
          if (resource.type === "componentConfig") {
            config.current = resource.component;
            setFullMetaConfig(resource.fullMetaConfig);
            setCompName(resource.compName);
            trigger((x) => x + 1);
          }
          if (resource.type === "sidebarItems") {
            setSidebarItems(resource.sidebarItems);
          }
          if (
            event.data?.source === "Navbar" &&
            event.data?.resource?.type === "colorTheme"
          ) {
            const colorVars = event.data.resource.colors;

            Object.entries(colorVars).forEach(([key, value]) => {
              document.documentElement.style.setProperty(key, value);
            });
          }
        }
      }
    };

    window.parent.postMessage(
      { source: "APP", type: "request", request: { type: "componentConfig" } },
      "*"
    );
    window.parent.postMessage(
      { source: "APP", type: "request", request: { type: "sidebarItems" } },
      "*"
    );
    window.parent.postMessage(
      { source: "APP", type: "request", request: { type: "theme" } },
      "*"
    );

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setSidebarItems, trigger, setFullMetaConfig]);

  const setConfig = useCallback((conf) => {
    window.parent.postMessage(
      {
        source: "APP",
        type: "resource",
        resource: { type: "customConfig", customConfig: conf },
      },
      "*"
    );
    config.current = conf;
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

  const updateNodeById = (tree, nodeId, updates) => {
    if (!tree) return tree;
    if (tree.id === nodeId) {
      return { ...tree, ...updates };
    }

    let updatedChildren = tree.children?.map((child) =>
      updateNodeById(child, nodeId, updates)
    );

    return {
      ...tree,
      ...(updatedChildren ? { children: updatedChildren } : {}),
      ...(tree.elementType === "CONDITIONAL"
        ? {
            trueCase: updateNodeById(tree.trueCase, nodeId, updates),
            falseCase: updateNodeById(tree.falseCase, nodeId, updates),
          }
        : {}),
    };
  };

  const deleteNodeById = (tree, nodeId) => {
    if (!tree) return null;
    if (tree.id === nodeId) return null;

    let newChildren = tree.children
      ?.map((child) => deleteNodeById(child, nodeId))
      .filter(Boolean);

    return {
      ...tree,
      ...(newChildren ? { children: newChildren } : {}),
      ...(tree.elementType === "CONDITIONAL"
        ? {
            trueCase: deleteNodeById(tree.trueCase, nodeId),
            falseCase: deleteNodeById(tree.falseCase, nodeId),
          }
        : {}),
    };
  };

  const toggle = () => {
    window.parent.postMessage({ source: "APP", action: "TOGGLE_SIDEBAR" }, "*");
  };

  const handleMouseMove = (e) => {
    const newWidth = Math.min(Math.max(e.clientX, 150), 600);
    sidebarWidthRef.current = newWidth;

    if (sidebarRef.current && pageContainerRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      pageContainerRef.current.style.width = `calc(100% - ${newWidth + 6}px)`;
    }
  };

  const startResizing = () => {
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";

    const sidebar = sidebarRef.current;
    const pageContainer = pageContainerRef.current;

    if (sidebar) sidebar.classList.add("no-transition");
    if (pageContainer) pageContainer.classList.add("no-transition");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const stopResizing = () => {
    isResizingRef.current = false;
    document.body.style.cursor = "default";

    const sidebar = sidebarRef.current;
    const pageContainer = pageContainerRef.current;

    if (sidebar) sidebar.classList.remove("no-transition");
    if (pageContainer) pageContainer.classList.remove("no-transition");

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
                  setItem={(updatedNode) => {
                    const prevTree = deepCopy(config.current);
                    const newTree = updateNodeById(
                      config.current,
                      updatedNode.id,
                      updatedNode
                    );
                    config.current = newTree;
                    trigger((x) => x + 1);
                    setConfig(newTree);
                    pushChanges({
                      doChanges: () => {
                        config.current = prevTree;
                        trigger((x) => x + 1);
                        setConfig(prevTree);
                      },
                    });
                  }}
                  handleDeleteItem={(id) => {
                    const prevTree = deepCopy(config.current);
                    const newTree = deleteNodeById(config.current, id);
                    config.current = newTree;
                    trigger((x) => x + 1);
                    setConfig(newTree);
                    pushChanges({
                      doChanges: () => {
                        config.current = prevTree;
                        trigger((x) => x + 1);
                        setConfig(prevTree);
                      },
                    });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resizer */}
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
          <div className={`${isPreview ? "brDnd-hidden" : ""} d-flex`}>
            <span
              onClick={undoChanges}
              className="mx-2"
              disabled={undoStack.length === 0}
            >
              <img src={undoButton} alt="undo" />
            </span>
            <span onClick={redoChanges} disabled={redoStack.length === 0}>
              <img src={redoButton} alt="redo" />
            </span>
          </div>
          <div className="brDnd-toggleButtonContainer">
            <button
              className="brDnd-toggleButton"
              onClick={() => {
                setIsPreview((prev) => !prev);
                toggle();
              }}
            >
              {isPreview ? "Edit" : "Finish Editing"}
            </button>
          </div>
        </div>
        <div className="brDnd-page" id="page">
          {config.current && config.current.elementType ? (
            <Renderer
              item={config.current}
              heirarchy={[config.id]}
              isPreview={isPreview}
              updateItem={setConfig}
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
