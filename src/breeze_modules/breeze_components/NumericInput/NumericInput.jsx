import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const NumericInput = ({
  // Functional Props
  disabled = false,
  id = "numeric-input",
  name = "numericInput",
  readOnly = false,
  required = false,

  // Styling Props
  className = "numeric-input",
  style = {
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    width: "200px",
  },
  wrapperClassName = "numeric-wrapper",

  // Label Props
  labelText = "Enter Number:",
  labelPosition = "left", // top | bottom | left | right
  labelVisibility = true,
  labelClassName = "numeric-label mt-2",
  requiredIndicator = false,

  // Numeric Props
  max = undefined,
  min = undefined,
  step = 1,
  onChange = () => {},
  placeholder = "",
  value = undefined,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    const num = val === "" ? undefined : Number(val);
    setInternalValue(num);
    onChange(num);
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
        type="number"
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={className}
        style={style}
        max={max}
        min={min}
        step={step}
        placeholder={placeholder}
        value={internalValue !== undefined ? internalValue : ""}
        onChange={handleChange}
      />

      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

NumericInput.propTypes = {
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
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.number,
};
