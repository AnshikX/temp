import upArrow from "../assets/svgs/up-arrow.svg";
import downArrow from "../assets/svgs/down-arrow.svg";
import PropTypes from "prop-types";
import { DraggableItem } from "./DraggableItem";

export const SidebarSection = ({ title, open, toggle, items, theme }) => (
    <div className="mb-2 mt-3">
      <span
        onClick={toggle}
        className={`brDnd-section-title ${theme === "dark" ? "dark" : "light"}`}
      >
        {title}
        {open ? (
          <img src={upArrow} alt="expand" />
        ) : (
          <img src={downArrow} alt="collapse" />
        )}
      </span>
      {open && (
        <div className="brDnd-section-content">
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
      )}
    </div>
  );
  
  
  SidebarSection.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    theme: PropTypes.string.isRequired,
  };
  