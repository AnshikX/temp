import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { loadEntity } from "../../Entities";
import { libraries } from "../../utils/thirdPartyLibraries";
import * as secondParty from "../../breeze_components";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackWithReload } from "../utils/FallbackWithReload";

const checkNullity = (child) => {
  if (!child) return null;
  if (Array.isArray(child)) {
    const filtered = child.map(checkNullity).filter(Boolean);
    return filtered.length > 0 ? filtered : null;
  }
  return child;
};

const normalizeAttributes = (attrs = {}) => {
  const normalized = {};
  for (const key in attrs) {
    const val = attrs[key];
    if (val && typeof val === "object" && val.type === "CUSTOM") {
      try {
        normalized[key] =
          typeof val.value === "string" ? JSON.parse(val.value) : val.value;
      } catch {
        normalized[key] = val.value;
      }
    }
    // Handle "LABEL" type or other STRING types that might be JSON-stringified
    else if (
      val &&
      typeof val === "object" &&
      val.type === "LABEL" &&
      typeof val.value === "string"
    ) {
      try {
        // parse stringified JSON values (like "\"alarm\"")
        normalized[key] = JSON.parse(val.value);
      } catch (e) {
        // If parsing fails
        normalized[key] = val.value;
      }
    } else {
      normalized[key] = val?.value ?? val;
    }
  }
  return normalized;
};

const getLibraryKey = (libNameWithVersion) => {
  if (!libNameWithVersion || typeof libNameWithVersion !== "string")
    return null;
  if (libNameWithVersion === "bootstrap-icons") return null;

  if (libNameWithVersion.startsWith("@")) {
    const match = libNameWithVersion.match(/^(@[^/]+\/[^@]+)(?:@.+)?$/);
    return match ? match[1] : null;
  }

  return libNameWithVersion.split("@")[0];
};

const PreviewSwitchRenderer = ({ item, children }) => {
  const [importedComponent, setImportedComponent] = useState({
    isLoaded: false,
    component: null,
    error: false,
  });
  const [errorResetKey, setErrorResetKey] = useState(0);

  const processedChildren = useMemo(() => checkNullity(children), [children]);
  const normalizedAttributes = useMemo(
    () => normalizeAttributes(item.attributes),
    [item.attributes]
  );

  const forceRerender = () => setErrorResetKey((k) => k + 1);

  const boundaryProps = {
    FallbackComponent: (props) => (
      <FallbackWithReload {...props} resetErrorBoundary={forceRerender}>
        {processedChildren}
      </FallbackWithReload>
    ),
    resetKeys: [errorResetKey],
  };

  useEffect(() => {
    if (item.elementType === "COMPONENT") {
      loadEntity(item["$ref"])
        .then((data) => {
          setImportedComponent({
            component: data,
            isLoaded: true,
            error: false,
          });
        })
        .catch(() => {
          setImportedComponent({ isLoaded: false, error: true });
        });
    } else if (item.elementType === "html") {
      setImportedComponent({ isLoaded: true });
    } else if (item.elementType === "THIRD_PARTY") {
      async function loadThirdParty() {
        try {
          const libKey = getLibraryKey(item.library);
          if (!libKey || !libraries[libKey]) return;
          const module = await libraries[libKey];
          const component = module[item.tagName];
          if (!component) return;
          setImportedComponent({ component, isLoaded: true });
        } catch {
          setImportedComponent({ isLoaded: false, error: true });
        }
      }
      loadThirdParty();
    } else if (item.elementType === "BREEZE_COMPONENT") {
      const component = secondParty[item.tagName];
      if (component) {
        setImportedComponent({ component, isLoaded: true });
      } else {
        setImportedComponent({ isLoaded: false, error: true });
      }
    }
  }, [item]);

  // ---- Rendering logic ----
  const baseStyles = {
    ...item.appliedStyles,
    pointerEvents: "none",
  };

  const commonProps = {
    ...normalizedAttributes,
    style: baseStyles,
    id: item.id,
  };
  if (
    item.elementType === "COMPONENT" ||
    item.elementType === "THIRD_PARTY" ||
    item.elementType === "BREEZE_COMPONENT"
  ) {
    if (importedComponent.error) {
      return (
        <ErrorBoundary {...boundaryProps}>
          <div
            style={{
              ...baseStyles,
              border: "1px solid red",
              padding: "10px",
              color: "red",
            }}
          >
            Error loading component: {item.tagName || item.elementType}.
          </div>
        </ErrorBoundary>
      );
    }
    if (!importedComponent.isLoaded) {
      return <div>Loading {item.tagName || item.elementType}...</div>;
    }

    const ComponentToRender =
      importedComponent.component || item.tagName || "div";

    const shouldRenderChildren = !(
      item.elementType === "BREEZE_COMPONENT" && item.tagName === "TextInput"
    );

    return (
      <ErrorBoundary {...boundaryProps}>
        {item.tagName === "fragment"
          ? processedChildren
          : React.createElement(
              ComponentToRender,
              commonProps,
              shouldRenderChildren ? processedChildren : undefined
            )}
      </ErrorBoundary>
    );
  }

  // default: HTML tag render
  return (
    <ErrorBoundary {...boundaryProps}>
      <>
        {React.createElement(
          item.tagName || "div",
          commonProps, // Use commonProps including styles
          processedChildren
        )}
      </>
    </ErrorBoundary>
  );
};

PreviewSwitchRenderer.propTypes = {
  item: PropTypes.shape({
    elementType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    $ref: PropTypes.string,
    attributes: PropTypes.object,
    appliedStyles: PropTypes.object, // Expect appliedStyles from parent
    library: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

export default React.memo(PreviewSwitchRenderer, (prevProps, nextProps) => {
  return (
    prevProps.item === nextProps.item &&
    prevProps.children === nextProps.children
  );
});
