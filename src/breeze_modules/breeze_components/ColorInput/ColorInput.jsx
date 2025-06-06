import { useState } from "react";
import PropTypes from "prop-types";

export const ColorInput = ({
  // Functional Props
  disabled = false,
  id = "color-input",
  name = "colorInput",
  readOnly = false,
  required = false,

  // Styling Props
  className = "color-input",
  style = {
    border: "1px solid #ccc",
    padding: "4px",
    borderRadius: "4px",
    width: "50px",
    height: "40px",
    cursor: "pointer",
  },
  wrapperClassName = "color-wrapper",

  // Label Props
  labelText = "Select Color:",
  labelPosition = "left", // top | bottom | left | right
  labelVisibility = true,
  labelClassName = "color-label mt-2",
  requiredIndicator = false,

  // Color Input Specific
  onChange = () => {},
  value = "#000000",
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e) => {
    if (readOnly) return;
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange(newValue);
  };
  const renderLabel = () =>
    labelVisibility && (
      <label
        htmlFor={id}
        className={labelClassName}
        style={{ marginBottom: "4px" }}
      >
        {labelText}{" "}
        {requiredIndicator && <span style={{ color: "red" }}>*</span>}
      </label>
    );

  return (
    <div
      className={wrapperClassName}
      style={{
        display: "flex",
        flexDirection:
          labelPosition === "left" || labelPosition === "right"
            ? "row"
            : "column",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      {(labelPosition === "top" || labelPosition === "left") && renderLabel()}
      <input
        type="color"
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={className}
        style={style}
        value={internalValue}
        onChange={handleChange}
      />
      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

ColorInput.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  wrapperClassName: PropTypes.string,
  labelText: PropTypes.string,
  labelPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  labelVisibility: PropTypes.bool,
  labelClassName: PropTypes.string,
  requiredIndicator: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
