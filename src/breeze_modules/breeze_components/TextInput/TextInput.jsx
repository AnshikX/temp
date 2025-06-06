import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TextInput = ({
  // Functional Props
  disabled = false,
  id = "text-input",
  name = "textInput",
  readOnly = false,
  required = false,

  // Styling Props
  className = "text-input",
  style = {
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    width: "200px",
  },
  wrapperClassName = "text-wrapper",

  // Label Props
  labelText = "Enter Text:",
  labelPosition = "left", // top | bottom | left | right
  labelVisibility = true,
  labelClassName = "text-label mt-2",
  requiredIndicator = false,

  // Text Props
  placeholder = "Type here...",
  value = "",
  onChange = () => {},
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    onChange(e.target.value);
  };

  const renderLabel = () =>
    labelVisibility && (
      <label htmlFor={id} className={labelClassName}>
        {labelText}
        {requiredIndicator && <span style={{ color: "red" }}> *</span>}
      </label>
    );

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

      <input
        type="text"
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={className}
        style={style}
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
      />

      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

TextInput.propTypes = {
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
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
