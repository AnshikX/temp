import React, { useEffect, useMemo, useState } from "react";
import { loadEntity } from "../../Entities";
import PropTypes from "prop-types";
import { libraries } from "../../utils/thirdPartyLibraries";
import nulledEventAttrs from "./NulledListeners";
import { ErrorBoundary } from "react-error-boundary";
import * as secondParty from "../../breeze_components";
import { FallbackWithReload } from "../utils/FallbackWithReload";
import { OverlayRenderer } from "./OverlayRenderer";

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
        if (typeof val.value === "string") {
          normalized[key] = JSON.parse(val.value);
        } else {
          normalized[key] = val.value;
        }
      } catch {
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
    return match ? match[1] : null; // → "@mui/material"
  }

  return libNameWithVersion.split("@")[0]; // → "react-bootstrap"
};

const SwitchRenderer = ({
  item,
  children,
  handleSelect,
  handleMouseOver,
  handleMouseOut,
  drag,
  opacity,
  processedAttributes,
  zbase = 0,
}) => {
  const [importedComponent, setImportedComponent] = useState({
    isLoaded: false,
    error: false,
  });
  const [errorResetKey, setErrorResetKey] = useState(0);

  const processedChildren = useMemo(() => {
    return checkNullity(children);
  }, [children]);

  const forceRerender = () => {
    setErrorResetKey((k) => k + 1);
  };

  const boundaryProps = {
    FallbackComponent: (props) => (
      <FallbackWithReload
        resetErrorBoundary={forceRerender}
        id={item.id}
        zbase={zbase}
        opacity={opacity}
        onClick={handleSelect}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        drag={drag}
        {...props}
      >
        {processedChildren}
      </FallbackWithReload>
    ),
    resetKeys: [errorResetKey],
  };

  const normalizedAttributes = useMemo(
    () => normalizeAttributes(processedAttributes),
    [processedAttributes]
  );

  useEffect(() => {
    if (item.elementType === "COMPONENT") {
      loadEntity(item["$ref"])
        .then((data) => {
          setImportedComponent((comp) => {
            if (comp.component != data) {
              return { component: data, isLoaded: true, error: false };
            }
            return comp;
          });
        })
        .catch(() => {
          setImportedComponent({ isLoaded: false, error: true });
        });
    } else {
      if (item.elementType === "html") {
        setImportedComponent({ isLoaded: true });
      }
      if (item.elementType === "THIRD_PARTY") {
        async function loadThirdPartyComponent() {
          try {
            const libKey = getLibraryKey(item.library);
            if (!libKey || !libraries[libKey]) {
              console.error("Library not found or skipped:", item.library);
              return;
            }

            const module = await libraries[libKey];
            const component = module[item.tagName];
            if (!component) {
              console.error(
                `Component ${item.tagName} not found in ${item.library}`
              );
              return;
            }
            setImportedComponent({ component, isLoaded: true });
          } catch (error) {
            console.error(`Failed to load ${item.library}:`, error);
          }
        }

        loadThirdPartyComponent();
      }
      if (item.elementType === "BREEZE_COMPONENT") {
        async function loadSecondPartyComponent() {
          try {
            const component = secondParty[item.tagName];
            if (!component) {
              console.error(
                `Component ${item.tagName} not found in ${item.library}`
              );
              return;
            }
            setImportedComponent({ component, isLoaded: true });
          } catch (error) {
            console.error(`Failed to load ${item.library}:`, error);
          }
        }

        loadSecondPartyComponent();
      }
    }
  }, [item, item.$ref, item.elementType, item.id, item.library, item.tagName]);

  if (item.elementType === "THIRD_PARTY" || item.elementType === "COMPONENT") {
    return importedComponent.isLoaded ? (
      <ErrorBoundary {...boundaryProps}>
        <OverlayRenderer
          drag={drag}
          zbase={zbase + 1}
          onClick={handleSelect}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          itemId={item.id}
        >
          {item.tagName === "fragment"
            ? processedChildren
            : React.createElement(
                importedComponent.component || item.tagName || "div",
                {
                  ...normalizedAttributes,
                },
                processedChildren
              )}
        </OverlayRenderer>
      </ErrorBoundary>
    ) : (
      <div>Loading...</div>
    );
  }
  if (item.elementType === "BREEZE_COMPONENT") {
    return importedComponent.isLoaded ? (
      <div
        id={item.id}
        style={{ opacity, zIndex: zbase, position: "relative" }}
        onClick={handleSelect}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={(node) => drag(node)}
      >
        <ErrorBoundary {...boundaryProps}>
          {item.tagName === "fragment"
            ? processedChildren
            : React.createElement(
                importedComponent.component || item.tagName || "div",
                {
                  ...normalizedAttributes,
                },
                processedChildren
              )}
        </ErrorBoundary>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }

  return React.createElement(
    item.tagName || "div",
    {
      ...normalizedAttributes,
      ...nulledEventAttrs,
      ...(item.tagName === "input" ? { readOnly: true } : {}),
      style: {
        ...item.appliedStyles,
        opacity,
        zIndex: zbase,
        position: "relative",
      },
      onClick: handleSelect,
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut,
      id: item.id,
      ref: (node) => drag(node),
    },
    processedChildren
  );
};

export default SwitchRenderer;

SwitchRenderer.propTypes = {
  item: PropTypes.shape({
    elementType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    $ref: PropTypes.string,
    attributes: PropTypes.object,
    appliedStyles: PropTypes.object,
    library: PropTypes.string,
  }).isRequired,
  children: PropTypes.array,
  handleSelect: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  drag: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
  processedAttributes: PropTypes.object.isRequired,
  zbase: PropTypes.number.isRequired,
};
