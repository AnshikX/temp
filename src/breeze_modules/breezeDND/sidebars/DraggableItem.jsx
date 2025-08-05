import { useCallback } from "react";
import { generateIdFromTemplate } from "../utils/generateIds";
import PropTypes from "prop-types";
import truncateWithEllipsis from "../../utils/truncateText";
import { useCustomDrag } from "../dragndropUtils/useCustomDrag";

export const DraggableItem = ({ data }) => {
  const getItem = useCallback(() => {
    const config = generateIdFromTemplate(data);
    return { item: config };
  }, [data]);

  const [{ isDragging }, drag] = useCustomDrag({
    item: getItem(),
    canDrag: () => true,
    mode: "cross-frame",
  });
  
  const iconClass = data.icon || "bi-table";

  return (
    <div className="brDnd-cardItem" ref={drag} style={{ opacity: isDragging ? 0.4 : 1 }}>
      <div className="brDnd-cardImageWrapper">
        <i className={`bi ${iconClass} fs-4 brDnd-cardIcon`} />
      </div>
      <div className="brDnd-cardLabel">
        {truncateWithEllipsis(data.label, 10)}
      </div>
    </div>
  );
};

DraggableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
