import PropTypes from "prop-types";

const OverlayToolbar = ({
  top,
  left,
  label,
  labelSuffix,
  onDelete,
  isFirst,
  onHover,
  onDuplicate,
  position,
  selectParent,
}) => {
  const TOOLBAR_WIDTH = 240;
  const viewportWidth = window.innerWidth;

  const adjustedLeft = Math.max(
    0,
    Math.min(left, viewportWidth - TOOLBAR_WIDTH)
  );

  return (
    <div
      style={{
        position: "fixed",
        top: `${top}px`,
        left: `${adjustedLeft}px`,
        background: "#2680eb",
        color: "white",
        padding: "4px",
        borderRadius: "5px",
        zIndex: 11,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        display: "flex",
        gap: "5px",
        alignItems: "center",
        transform:
          position === "top"
            ? "translateY(-100%)"
            : position === "bottom"
            ? "translateY(0%)"
            : "translateY(0%)",
        transformOrigin: "top",
        maxWidth: "calc(100vw - 16px)",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <span>
        {label || "Unnamed Item"} {labelSuffix}
      </span>
      {!isFirst && <i className="bi bi-arrow-up" onClick={selectParent} style={{ cursor: "pointer" }} />}
      {!isFirst && <i className="bi bi-clipboard-plus" onClick={onDuplicate} style={{ cursor: "pointer" }} />}
      {!isFirst && <i className="bi bi-trash" onClick={onDelete} style={{ cursor: "pointer" }} />}
    </div>
  );
};

OverlayToolbar.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  label: PropTypes.string,
  labelSuffix: PropTypes.string,
  onDelete: PropTypes.func,
  isFirst: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  selectParent: PropTypes.func.isRequired,
};

export default OverlayToolbar;
