import { React } from "react";
import { Container } from "react-bootstrap";
const Style = ({ styles }) => {
  const some = { name: "Abc" };
  /* abc */
  const { projectName } = useParams();
  const iframeRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const isResizing = useRef(false);
  const animationFrameId = useRef(null);
  const lastX = useRef(null);

  const [projectPort, setProjectPort] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [sidebarItems, setSidebarItems] = useState({
    htmlItems: [],
    components: [],
    third_party: [],
    widgets: [],
  });
  const [componentConfig, setComponentConfig] = useState();
  const [componentTempConfig, setComponentTempConfig] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      // object recieved when calling ref.current
      onButtonClick: () => {
        setComponentConfig(componentTempConfig);
        updateAstStatement(projectName, {
          fileId: selectedTab?.id,
          statementId: componentTempConfig.id,
          config: componentTempConfig,
        });
      },
    };
  }, [componentTempConfig, projectName, selectedTab?.id]);

  const sidebarRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;
    lastX.current = e.clientX;
    document.body.style.cursor = "ew-resize";

    if (sidebarRef.current) {
      sidebarRef.current.classList.add("no-transition");
    }

    if (iframeRef.current) {
      iframeRef.current.style.pointerEvents = "none";
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;

      if (animationFrameId.current) return;

      animationFrameId.current = requestAnimationFrame(() => {
        const windowWidth = window.innerWidth;
        const newSidebarWidth = windowWidth - e.clientX;
        const clamped = Math.max(300, Math.min(600, newSidebarWidth));
        setSidebarWidth(clamped);
        animationFrameId.current = null;
      });
    };

    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = "";

        if (sidebarRef.current) {
          sidebarRef.current.classList.remove("no-transition");
        }

        if (iframeRef.current) {
          iframeRef.current.style.pointerEvents = "";
        }
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };

    // Use document instead of window to capture events everywhere
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Fetch initial component configuration
  useEffect(() => {
    const fetchComponentConfig = async () => {
      if (selectedTab?.activeTabMetaData?.getConfig) {
        const response = await selectedTab.activeTabMetaData.getConfig();
        const statementId = response.config.id;
        const res = await getInitialConfig(projectName, {
          fileId: selectedTab?.id,
          statementId,
        });
        setComponentConfig(res.config);
      } else {
        // fallback: get AST and extract RETURN statement's value
        try {
          const res = await getAstStatement(projectName, {
            fileId: selectedTab?.id,
            statementId: selectedTab?.id,
          });

          const findReturnValue = (node) => {
            if (!node) return null;

            // If it's a RETURN statement, return its value
            if (node.type === "RETURN" && node.value) {
              return node.value;
            }

            // If it has statements (BLOCK or REACT_COMPONENT with bodyConfig), dive into them
            if (Array.isArray(node.statements)) {
              for (const stmt of node.statements) {
                const result = findReturnValue(stmt);
                if (result) return result;
              }
            }

            // Check nested bodyConfig
            if (node.bodyConfig) {
              return findReturnValue(node.bodyConfig);
            }

            return null;
          };

          const returnValue = findReturnValue(res.config);

          if (returnValue) {
            setComponentConfig(returnValue);
          } else {
            console.warn("No RETURN statement found in AST.");
          }
        } catch (err) {
          console.error(
            "Failed to load fallback component config from AST:",
            err,
          );
        }
      }
    };
    fetchComponentConfig();
  }, [selectedTab, projectName]);

  // Fetch project port on component mount
  useEffect(() => {
    getProjectPort(projectName)
      .then((port) => setProjectPort(port.port))
      .catch((error) => console.error("Error fetching project port:", error));
  }, [projectName]);

  // Fetch sidebar items on component mount
  useEffect(() => {
    getSideBarItems(projectName)
      .then((response) =>
        setSidebarItems((prev) => ({
          ...response,
          third_party: prev.third_party || [],
        })),
      )
      .catch((error) => console.error("Error fetching sidebar items:", error));
  }, [projectName]);

  // Fetch the list of third-party libraries
  useEffect(() => {
    async function fetchData() {
      try {
        const thirdPartyComponentsResponse =
          await getAllThirdPartyLibraries(projectName);
        const thirdPartyComponents = Object.entries(
          thirdPartyComponentsResponse,
        ).map(([lib, version]) => `${lib}@${version.replace(/^(\^)/, "")}`);
        // Update sidebarItems to include third party libraries
        setSidebarItems((prev) => ({
          ...prev,
          third_party: thirdPartyComponents,
        }));
      } catch (error) {
        console.error("Error fetching third-party libraries:", error);
      }
    }
    fetchData();
  }, [projectName]);

  // Send initial component configuration to the iframe
  const sendComponentConfig = useCallback(() => {
    if (componentConfig) {
      setComponentTempConfig(componentConfig);
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "resource",
            resource: { type: "componentConfig", component: componentConfig },
            source: "BREEZE",
          },
          "*",
        );
      }
    }
  }, [componentConfig]);

  // Send sidebar items to the iframe
  const sendSidebarItems = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "resource",
          resource: { type: "sidebarItems", sidebarItems: sidebarItems },
          source: "BREEZE",
        },
        "*",
      );
    }
  }, [sidebarItems]);

  // Send metaConfig to the iframe
  const sendMetaConfig = useCallback(
    async (statementId) => {
      if (iframeRef.current?.contentWindow) {
        try {
          const res = await getAstStatement(projectName, {
            fileId: selectedTab?.id,
            statementId,
          });
          const metaConfig = res.configMeta;
          iframeRef.current.contentWindow.postMessage(
            {
              type: "resource",
              resource: { type: "metaConfig", metaConfig, statementId },
              source: "BREEZE",
            },
            "*",
          );
        } catch {
          const metaConfig = {
            id: statementId,
            index: "",
            returnStatements: [
              {
                index: "bodyConfig<>statements<>0",
              },
            ],
          };
          iframeRef.current.contentWindow.postMessage(
            {
              type: "resource",
              resource: { type: "metaConfig", metaConfig, statementId },
              source: "BREEZE",
            },
            "*",
          );
        }
      }
    },
    [projectName, selectedTab?.id],
  );

  // Handle iframe load
  useEffect(() => {
    if (iframeLoaded && componentConfig) {
      sendComponentConfig();
      sendSidebarItems();
    }
  }, [
    iframeLoaded,
    sendComponentConfig,
    sendSidebarItems,
    componentConfig,
    sidebarItems,
  ]);

  // Listen for messages from the iframe
  useEffect(() => {
    const handleMessageEvent = async (event) => {
      if (event.data?.source === "APP") {
        console.log(event.data);
        const { type, action, resource, request, widgetConfig, payload } =
          event.data;

        if (type === "resource" && resource?.type === "customConfig") {
          setComponentTempConfig(resource.customConfig);
        }

        if (type === "request" && request?.type === "componentConfig") {
          sendComponentConfig();
        }

        if (action === "TOGGLE_SIDEBAR") {
          setIsPreview((prev) => !prev);
        }

        if (action === "FETCH_CONFIG") {
          setShowModal(true);
          setWidgetConfig(widgetConfig);
        }

        if (action === "FETCH_THIRD_PARTY_COMPONENTS") {
          try {
            const { libName: fullLibName } = payload || {};
            if (!fullLibName) return;

            const atIndex = fullLibName.lastIndexOf("@");
            const library = fullLibName.slice(0, atIndex);
            const version = fullLibName.slice(atIndex + 1);

            const { mostUsed = [], allComponents = [] } =
              await getThirdPartySidebaritems(projectName, {
                library,
                version,
              });

            const thirdPartyItems = [
              {
                libName: fullLibName,
                mostUsed,
                allComponents,
              },
            ];

            iframeRef.current?.contentWindow?.postMessage(
              {
                type: "resource",
                resource: {
                  type: "third_party",
                  third_party: thirdPartyItems,
                },
                source: "BREEZE",
              },
              "*",
            );
          } catch (err) {
            console.error("Failed to fetch third-party components:", err);
          }
        }
      }
    };

    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, [sendComponentConfig, sendMetaConfig, isPreview, iframeRef, projectName]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      if (!next) {
        setShowToggleButton(false);
      }
      return next;
    });
  };
  return <Container className={"mt-3"}>fghjkl;</Container>;
};
export default Style;
