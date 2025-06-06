import React, { useEffect, useMemo, useState } from "react";
import { loadEntity } from "../../Entities";
import PropTypes from "prop-types";
import { libraries } from "../../utils/thirdPartyLibraries";
import nulledEventAttrs from "./NulledListeners";
import { ErrorBoundary } from "react-error-boundary";
import * as secondParty from "../../breeze_components";
const FallbackWithReload = ({ error, resetErrorBoundary, children }) => (
  <div
    style={{
      border: "1px solid red",
      padding: "10px",
      background: "#fff0f0",
      color: "#900",
      position: "relative",
    }}
  >
    <div style={{ marginBottom: "8px" }}>
      <strong>Render Error:</strong> {error.message}
    </div>
    <button
      onClick={resetErrorBoundary}
      style={{
        cursor: "pointer",
        background: "transparent",
        border: "none",
        color: "#007bff",
        textDecoration: "underline",
        padding: 0,
      }}
    >
      Reload Component
    </button>
    <div style={{ marginTop: "8px" }}>{children}</div>
  </div>
);
function mergeComputedStyles(sourceEl, destEl) {
  const computed = window.getComputedStyle(sourceEl);
  // Get already set inline styles on destination
  const destInlineStyles = destEl.style;

  for (let prop of computed) {
    // Only apply if dest doesn't already define it
    if (!destInlineStyles[prop]) {
      try {
        destEl.style[prop] = computed.getPropertyValue(prop);
      } catch (e) {
        console.warn(`Failed to copy style "${prop}":`, e);
      }
    }
  }
}

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

const SwitchRenderer = ({
  item,
  children,
  handleSelect,
  handleMouseOver,
  handleMouseOut,
  drag,
  opacity,
  processedAttributes,
}) => {
  const isWrapped =
    item.elementType === "THIRD_PARTY" ||
    item.elementType === "BREEZE_COMPONENT" ||
    item.elementType === "COMPONENT" ||
    item.elementType === "fragment";
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
      <FallbackWithReload {...props} resetErrorBoundary={forceRerender}>
        {processedChildren}
      </FallbackWithReload>
    ),
    resetKeys: [errorResetKey],
  };

  const normalizedAttributes = useMemo(
    () => normalizeAttributes(processedAttributes),
    [processedAttributes]
  );

  // useEffect(() => {
  //   if (isWrapped) {
  //     setTimeout(() => {
  //       const el = document.querySelector(
  //         `[data-style-id="${item.id}-for-styling"]`
  //       );

  //       if (el && el.childNodes.length === 1) {
  //         const child = el.childNodes[0];
  //         console.log(child);
  //         if (child) {
  //           mergeComputedStyles(child, el);
  //         }
  //       }
  //     }, 50);
  //   }
  // }, [isWrapped, item.id]);

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
            const module = await libraries[item.library.split("@")[0]];
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

  if (item.elementType === "COMPONENT" || item.tagName === "fragment") {
    return (
      <div
        id={item.id}
        style={{ opacity }}
        onClick={handleSelect}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={(node) => drag(node)}
      >
        {importedComponent.isLoaded ? (
          <ErrorBoundary
            FallbackComponent={({ error }) => (
              <div>
                {error.message} {processedChildren}{" "}
              </div>
            )}
          >
            {item.tagName === "fragment"
              ? processedChildren
              : React.createElement(
                  importedComponent.component,
                  { ...normalizedAttributes },
                  processedChildren
                )}
          </ErrorBoundary>
        ) : importedComponent.error ? (
          <>Deleteded Component{processedChildren}</>
        ) : (
          <>Loading...</>
        )}
      </div>
    );
  }

  if (item.elementType === "THIRD_PARTY") {
    return importedComponent.isLoaded ? (
      <div
        id={item.id}
        data-style-id={item.id + "-for-styling"}
        style={{ opacity, display: "block" }}
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
                { ...normalizedAttributes },
                processedChildren
              )}
        </ErrorBoundary>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
  if (item.elementType === "BREEZE_COMPONENT") {
    return importedComponent.isLoaded ? (
      <div
        id={item.id}
        data-style-id={item.id + "-for-styling"}
        style={{ opacity, display: "block" }}
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
                normalizedAttributes,
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
      style: item.appliedStyles,
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
};

FallbackWithReload.propTypes = {
  error: PropTypes.object,
  children: PropTypes.node,
  resetErrorBoundary: PropTypes.func,
};
