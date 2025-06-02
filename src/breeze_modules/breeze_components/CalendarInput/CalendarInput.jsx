import { useState } from "react";

export const CalendarInput = ({
  id = "calendar-input",
  name = "calendarInput",
  disabled = false,
  readOnly = false,
  required = false,
  className = "calendar-input",
  style = {
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "4px",
    width: "25%",
  },
  wrapperClassName = "calendar-wrapper",
  label = {
    text: "Select Date : ",
    position: "top",
    visibility: "show",
    className: "calendar-label me-2",
    requiredIndicator: true,
  },
  maxDate = "2030-12-31",
  minDate = "2000-01-01",
  onChange = (date) => console.log("Default onChange:", date),
  placeholder = "YYYY-MM-DD",
  value = new Date().toISOString().split("T")[0], // default to today
  ...ariaProps
}) => {
  const [selectedDate, setSelectedDate] = useState(value);

  const handleChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onChange(newDate ? new Date(newDate) : null);
  };

  const renderLabel = () => {
    if (!label || label.visibility === "hide") return null;
    return (
      <label htmlFor={id} className={label.className}>
        {label.text}
        {required && label.requiredIndicator && (
          <span style={{ color: "red" }}> *</span>
        )}
      </label>
    );
  };

  return (
    <div className={wrapperClassName}>
      {label?.position === "top" && renderLabel()}
      <input
        type="date"
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={className}
        style={style}
        value={selectedDate}
        onChange={handleChange}
        placeholder={placeholder}
        min={minDate}
        max={maxDate}
        {...ariaProps}
      />
      {label?.position === "bottom" && renderLabel()}
    </div>
  );
};
