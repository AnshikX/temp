import PropTypes from "prop-types";
import { DraggableItem } from "./DraggableItem";
import { useRef } from "react";

export const SidebarSection = ({ title, open, items, theme }) => {
  const headingId = `heading-${title.replace(/\s+/g, "-")}`;
  const collapseId = `collapse-${title.replace(/\s+/g, "-")}`;
  const isExpanded = open;
  const toggleButtonRef = useRef(null);

  const handleTileClick = () => {
    toggleButtonRef.current?.click();
  };

  return (
    <div
      className={`accordion-item brDnd-accordion ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <div
        className={`accordion-header ${theme === "dark" ? "dark" : "light"}`}
        id={headingId}
        onClick={handleTileClick}
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex justify-content-between align-items-center p-2">
          <span className="fw-semibold">{title}</span>
          <div className="d-flex align-items-center">
            <button
              ref={toggleButtonRef}
              className="accordion-button collapsed p-0 border-0 bg-transparent shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${collapseId}`}
              aria-expanded={isExpanded}
              aria-controls={collapseId}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      </div>
      <div
        id={collapseId}
        className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
        aria-labelledby={headingId}
      >
        <div className="accordion-body p-2">
          {items.length > 0 ? (
            <div className="brDnd-cardGrid">
              {items.map((item, index) => (
                <DraggableItem key={index} data={item} theme={theme} />
              ))}
            </div>
          ) : (
            <div className="fst-italic fs-6">No results</div>
          )}
        </div>
      </div>
    </div>
  );
};

SidebarSection.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired,
};
