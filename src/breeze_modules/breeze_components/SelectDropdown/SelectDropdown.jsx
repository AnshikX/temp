import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Option<T> Type
 * {
 *   label: string;
 *   value: T;
 *   className?: string;
 *   disabled?: boolean;
 *   style?: React.CSSProperties;
 * }
 */

export const SelectDropdown = ({
  // Functional Props
  disabled = false,
  id = "select-dropdown",
  name = "selectDropdown",
  required = false,

  // Styling Props
  className = "select-dropdown",
  style = {
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    width: "200px",
  },
  wrapperClassName = "select-wrapper",

  // Label Props
  labelText = "Select Option:",
  labelPosition = "left",
  labelVisibility = true,
  labelClassName = "select-label mt-2",
  requiredIndicator = false,

  // Select Props
  placeholder = "Please select...",
  value = "",
  onChange = () => {},
  options = [
    { label: "Components", value: "components" },
    { label: "Services", value: "services" },
    { label: "Utilities", value: "utilities", disabled: true },
  ],
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

      <select
        id={id}
        name={name}
        disabled={disabled}
        required={required}
        className={className}
        style={style}
        value={internalValue}
        onChange={handleChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className={opt.className}
            disabled={opt.disabled}
            style={opt.style}
          >
            {opt.label}
          </option>
        ))}
      </select>

      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

SelectDropdown.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      style: PropTypes.object,
    })
  ).isRequired,
};
