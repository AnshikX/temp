import {
  UNSAFE_RouteContext as RouteContext,
  UNSAFE_LocationContext as LocationContext,
} from "react-router";
import { useState, useEffect, useMemo } from "react";
import CommonProvider from "./CommonProvider";

const SandBox = () => {
  const [MyComponent, setMyComponent] = useState(() => {
    const DefaultComponent = () => <div>Preview</div>;
    DefaultComponent.displayName = "DefaultComponent";
    return DefaultComponent;
  });
  const [customProps, setCustomProps] = useState({ variant: "warning" });
  const [componentDir, setComponentDir] = useState("");
  const [sandboxStyle, setSandboxStyle] = useState({});
  const [styles, setStyles] = useState("");
  const [childText, setChildText] = useState({  });
  const [params, setParams] = useState({});
  const [query, setQuery] = useState({ });
  const [locationState, setLocationState] = useState();

  const search = new URLSearchParams(query).toString(); // theme=dark&layout=grid
  const location = {
    pathname: "/sandbox",
    search: `?${search}`,
    hash: "",
    state: locationState,
    key: "static", // doesn't matter unless you care about navigation
  };

  useEffect(() => {
    const handleMessage = (event) => {
      // Condition placed as a placeholder until the time our origin is fixed
      // eslint-disable-next-line no-constant-condition
      if (event.origin === "http://localhost:3000" || true) {
        if (event.data.type === "resource") {
          const resource = event.data.resource;
          console.log(resource);
          if (resource.type === "component") {
            setComponentDir(resource.component);
            setStyles(resource.component.styles);
            setSandboxStyle(resource.component.sandboxStyle);
            setChildText(resource.component.childrenText);
          }
          if (resource.type === "props") {
            setCustomProps(resource.props);
          }
          if (resource.type === "params") {
            if (typeof resource.params == "object") setParams(resource.params);
          }
          if (resource.type === "query") {
            if (typeof resource.query == "object") setQuery(resource.query);
          }
          if (resource.type === "locationState") {
            setLocationState(resource.locationState);
          }
        }
      }
    };
    window.parent.postMessage(
      { source: "APP", type: "request", request: { type: "component" } },
      "*"
    );
    window.parent.postMessage(
      { source: "APP", type: "request", request: { type: "query" } },
      "*"
    );
    window.parent.postMessage(
      { source: "APP", type: "request", request: { type: "props" } },
      "*"
    );
    window.parent.postMessage(
      { source: "APP", type: "request", request: { type: "params" } },
      "*"
    );

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const loader = async () => {
      try {
        let library = componentDir?.library;
        console.log(library);
        if (library === "html") {
          setMyComponent(() => componentDir.componentName);
          return;
        }
        if (library === "components") {
          const path = `${componentDir.componentPath}`;

          const comp = await import(path);
          const component =
            comp.default?.name === componentDir.componentName
              ? comp.default
              : comp[componentDir.componentName];

          setMyComponent(() => component);
          return;
        }
        let lib;
        switch (library) {
          case "react-bootstrap":
            lib = await import("react-bootstrap");
            break;

          default:
            console.error("Library not supported");
            return;
        }
        const { [componentDir.name]: Component } = lib;

        if (Component) {
          setMyComponent(() => Component);
        } else {
          console.error(`Component  not found in `);
        }
      } catch (error) {
        console.error("Failed to load component:", error);
      }
    };

    if (componentDir) {
      loader();
    }
  }, [componentDir]);

  const routeContextValue = useMemo(
    () => ({
      matches: [{ pathname: "", params }],
      outlet: null, // we’ll inject Main as the outlet below
    }),
    [params]
  );

  return (
    <CommonProvider>
      <LocationContext.Provider
        value={{ location: location, navigationType: "POP" }}
      >
        <RouteContext.Provider value={routeContextValue}>
          <div style={sandboxStyle} id="SandBox">
            <MyComponent {...customProps} style={styles} id="SandBox-1-1">
              {childText}
            </MyComponent>
          </div>
        </RouteContext.Provider>
      </LocationContext.Provider>
    </CommonProvider>
  );
};

export default SandBox;
