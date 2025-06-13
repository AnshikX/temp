import PropTypes from "prop-types";
import { DraggableItem } from "./DraggableItem";
import { useRef } from "react";

export const SidebarSection = ({ title, open, items }) => {
  const headingId = `heading-${title.replace(/\s+/g, "-")}`;
  const collapseId = `collapse-${title.replace(/\s+/g, "-")}`;
  const isExpanded = open;
  const toggleButtonRef = useRef(null);

  const handleTileClick = () => {
    toggleButtonRef.current?.click();
  };

  return (
    <div
      className="mb-2 accordion-item brDnd-accordion"
      style={{ border: "none" }}
    >
      <div
        className="rounded accordion-header"
        id={headingId}
        onClick={handleTileClick}
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex justify-content-between align-items-center p-2">
          <span className="fw-medium" style={{ fontSize: "14px" }}>
            {title}
          </span>
          <div className="d-flex align-items-center">
            <button
              ref={toggleButtonRef}
              className="accordion-button collapsed p-0 border-0 bg-transparent shadow-none custom-arrow-size"
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
        <div className="accordion-body p-1">
          {items.length > 0 ? (
            <div className="brDnd-cardGrid">
              {items.map((item, index) => (
                <DraggableItem key={index} data={item} />
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
};
