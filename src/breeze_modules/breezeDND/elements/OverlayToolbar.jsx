import PropTypes from "prop-types";
import deleteButton from "../assets/svgs/delete-button.svg";

const OverlayToolbar = ({ top, left, label, labelSuffix, onDelete, isFirst, onHover }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: `${top - 34}px`,
        left: `${left}px`,
        background: "#2680eb",
        color: "white",
        padding: "5px 10px",
        borderRadius: "5px",
        zIndex: 11,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <span>
        {label || "Unnamed Item"} {labelSuffix}
      </span>
      {!isFirst && (
        <img
          src={deleteButton}
          alt="Delete"
          style={{ width: "15px", height: "15px", cursor: "pointer" }}
          onClick={onDelete}
        />
      )}
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
};

export default OverlayToolbar;
