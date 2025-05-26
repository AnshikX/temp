import React, { useEffect, useState } from "react";
import { loadEntity } from "../../Entities";
import PropTypes from "prop-types";
import { libraries } from "../../utils/thirdPartyLibraries";
import nulledEventAttrs from "./NulledListeners";
import { ErrorBoundary } from "react-error-boundary";

const FallbackWithReload = ({ error, resetErrorBoundary, children }) => {
  return (
    <div style={{ border: "1px solid red", padding: "10px", background: "#fff0f0", color: "#900", position: "relative" }}>
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
      <div style={{ marginTop: "8px" }}>
        {children}
      </div>
    </div>
  );
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
  const [importedComponent, setImportedComponent] = useState({
    isLoaded: false,
    error: false,
  });
  const [errorResetKey, setErrorResetKey] = useState(0);

  const forceRerender = () => {
    setErrorResetKey((k) => k + 1);
  };

  const boundaryProps = {
    FallbackComponent: (props) => <FallbackWithReload {...props} resetErrorBoundary={forceRerender} >{children}</FallbackWithReload>,
    resetKeys: [errorResetKey],
  };

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
            const module = await libraries[item.library];
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
          <ErrorBoundary FallbackComponent={({ error }) => <div>{error.message} {children} </div>}>
            {item.tagName === "fragment"
              ? children
              : React.createElement(
                  importedComponent.component,
                  { ...processedAttributes },
                  children
                )}
          </ErrorBoundary>
        ) : importedComponent.error ? (
          <>Deleteded Component{children}</>
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
        style={{ opacity }}
        onClick={handleSelect}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={(node) => drag(node)}
      >
        <ErrorBoundary {...boundaryProps}>
          {item.tagName === "fragment"
            ? children
            : React.createElement(
                importedComponent.component || item.tagName || "div",
                { ...processedAttributes },
                children
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
      ...processedAttributes,
      ...nulledEventAttrs,
      style: item.appliedStyles,
      onClick: handleSelect,
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut,
      id: item.id,
      ref: (node) => drag(node),
    },
    children?.filter((i) => i).length > 0 ? children : null
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