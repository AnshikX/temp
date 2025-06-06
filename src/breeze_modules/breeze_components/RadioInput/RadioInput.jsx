import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const RadioInput = ({
  // Functional Props
  disabled = false,
  id = "radio-input",
  name = "radioInput",
  readOnly = false,
//   required = false,

  // Styling Props
  className = "radio-input",
  style = {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
  },
  wrapperClassName = "radio-wrapper",

  // Label Props
  labelText = "Select Option:",
  labelPosition = "left", // top | bottom | left | right
  labelVisibility = true,
  labelClassName = "radio-label",
  requiredIndicator = false,

  // Radio Props
  options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2", disabled: false },
    { label: "Option 3", value: "option3" },
  ],
  value = undefined,
  onChange = () => {},
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (val) => {
    if (readOnly || disabled) return;
    setSelectedValue(val);
    onChange(val);
  };

  const renderLabel = () =>
    labelVisibility && (
      <label htmlFor={id} className={labelClassName}>
        {labelText}{" "}
        {requiredIndicator && <span style={{ color: "red" }}>*</span>}
      </label>
    );

  const renderOptions = () => {
    return options.map((opt) => (
      <label
        key={opt.value}
        className={`${className} ${opt.className || ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          opacity: disabled || opt.disabled ? 0.6 : 1,
          cursor: disabled || opt.disabled ? "not-allowed" : "pointer",
          ...opt.style,
        }}
      >
        <input
          type="radio"
          name={name}
          disabled={disabled || opt.disabled || readOnly}
          checked={selectedValue === opt.value}
          onChange={() => handleChange(opt.value)}
          style={{ marginRight: "8px" }}
        />
        {opt.label}
      </label>
    ));
  };

  return (
    <div
      className={wrapperClassName}
      style={{
        display: "flex",
        flexDirection:
          labelPosition === "top" || labelPosition === "bottom"
            ? "column"
            : "row",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      {(labelPosition === "top" || labelPosition === "left") && renderLabel()}
      <div style={style}>{renderOptions()}</div>
      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

RadioInput.propTypes = {
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      style: PropTypes.object,
    })
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
