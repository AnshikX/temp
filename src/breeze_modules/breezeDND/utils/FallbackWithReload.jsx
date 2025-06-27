import PropTypes from "prop-types";
export const FallbackWithReload = ({
  error,
  resetErrorBoundary,
  children,
  id,
  opacity,
  zbase,
  drag,
  ...props
}) => (
  <div
    data-overlay-id={id}
    style={{
      border: "1px solid red",
      padding: "10px",
      background: "#fff0f0",
      color: "#900",
      position: "relative",
      pointerEvents: "auto",
      zIndex: zbase,
      opacity: opacity,
    }}
    ref={(node) => drag(node)}
    {...props}
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

FallbackWithReload.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
  children: PropTypes.node,
  id: PropTypes.string,
  zbase: PropTypes.number,
  drag: PropTypes.func,
  opacity: PropTypes.number,
};
