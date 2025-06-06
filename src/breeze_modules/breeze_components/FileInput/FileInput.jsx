import { useRef, useState } from "react";
import PropTypes from "prop-types";

export const FileInput = ({
  // Functional Props
  disabled = false,
  id = "file-input",
  name = "fileInput",
  readOnly = false,
  required = false,

  // Styling Props
  className = "file-input",
  style = {
    padding: "8px 12px",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  wrapperClassName = "file-wrapper",

  // Label Props
  labelText = "Select File:",
  labelPosition = "left", // top | bottom | left | right
  labelVisibility = true,
  labelClassName = "file-label",
  requiredIndicator = false,

  // File-specific props
  accept = "*/*",
  allowedMimeTypes = [],
  maxFileSize = Infinity,
  multiple = false,
  showFileNames = false,
  onChange = () => {},
}) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const files = e.target.files;
    if (readOnly || !files) return;

    // Check MIME types
    if (
      allowedMimeTypes.length > 0 &&
      [...files].some((file) => !allowedMimeTypes.includes(file.type))
    ) {
      alert("Invalid file type selected.");
      return;
    }

    // Check file sizes
    if ([...files].some((file) => file.size > maxFileSize)) {
      alert("File size exceeds the limit.");
      return;
    }

    setSelectedFiles(files);
    onChange(files);
  };

  const renderLabel = () =>
    labelVisibility && (
      <label
        htmlFor={id}
        className={labelClassName}
      >
        {labelText}
        {requiredIndicator && <span style={{ color: "red" }}> *</span>}
      </label>
    );

  const renderFileNames = () => {
    if (!showFileNames || !selectedFiles) return null;

    return (
      <ul style={{ marginTop: "6px", paddingLeft: "20px", fontSize: "0.9rem" }}>
        {[...selectedFiles].map((file, idx) => (
          <li key={idx}>{file.name}</li>
        ))}
      </ul>
    );
  };

  const triggerFileSelect = () => {
    if (!disabled && !readOnly && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={wrapperClassName}
      style={{
        display: "flex",
        flexDirection:
          labelPosition === "left" || labelPosition === "right"
            ? "row"
            : "column",
        alignItems: labelPosition === "left" ? "center" : "flex-start",
        gap: "8px",
      }}
    >
      {(labelPosition === "top" || labelPosition === "left") && renderLabel()}

      <div>
        <button
          type="button"
          className={className}
          style={style}
          onClick={triggerFileSelect}
          disabled={disabled || readOnly}
        >
          Choose File
        </button>

        <input
          type="file"
          ref={fileInputRef}
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />

        {renderFileNames()}
      </div>

      {(labelPosition === "bottom" || labelPosition === "right") &&
        renderLabel()}
    </div>
  );
};

FileInput.propTypes = {
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
  accept: PropTypes.string,
  allowedMimeTypes: PropTypes.arrayOf(PropTypes.string),
  maxFileSize: PropTypes.number,
  multiple: PropTypes.bool,
  showFileNames: PropTypes.bool,
  onChange: PropTypes.func,
};
