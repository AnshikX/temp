import { useState } from "react";
import PropTypes from "prop-types";

export const CheckboxInput = ({
  // Functional Props
  disabled = false,
  id = "checkbox-input",
  name = "checkboxInput",
  readOnly = false,
  required = false,

  // Styling Props
  className = "checkbox-input",
  style = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  wrapperClassName = "checkbox-wrapper",

  // Label Props
  labelText = "Check Me",
  labelPosition = "right", // top, bottom, left, right
  labelVisibility = true,
  labelClassName = "checkbox-label",
  requiredIndicator = false,

  // Checkbox specific
  checked = false,
  onChange = () => {},
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);

  const handleChange = (e) => {
    if (readOnly) return;
    const newChecked = e.target.checked;
    setInternalChecked(newChecked);
    onChange(newChecked);
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
        type="checkbox"
        id={id}
        name={name}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        className={className}
        style={style}
        checked={internalChecked}
        onChange={handleChange}
      />
      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

CheckboxInput.propTypes = {
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
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
