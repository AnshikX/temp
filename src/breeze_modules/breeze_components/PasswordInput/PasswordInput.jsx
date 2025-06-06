import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const PasswordInput = ({
  // Functional Props
  disabled = false,
  id = "password-input",
  name = "passwordInput",
  readOnly = false,
  required = false,

  // Styling Props
  className = "password-input",
  style = {
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    width: "200px",
  },
  wrapperClassName = "password-wrapper",

  // Label Props
  labelText = "Enter Password:",
  labelPosition = "left", // top | bottom | left | right
  labelVisibility = true,
  labelClassName = "password-label mt-2",
  requiredIndicator = false,

  // Password Props
  onChange = () => {},
  placeholder = "Enter password",
  showPassword = false,
  value = "",
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [visible, setVisible] = useState(showPassword);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    setVisible(showPassword);
  }, [showPassword]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    onChange(val);
  };

  const toggleVisibility = () => {
    setVisible((v) => !v);
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
        position: "relative",
      }}
    >
      {(labelPosition === "top" || labelPosition === "left") && renderLabel()}

      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <input
          type={visible ? "text" : "password"}
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
        <button
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontSize: "14px",
            userSelect: "none",
          }}
        >
          {visible ? "X" : "👁️"}
        </button>
      </div>

      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

PasswordInput.propTypes = {
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
  placeholder: PropTypes.string,
  showPassword: PropTypes.bool,
  value: PropTypes.string,
};
