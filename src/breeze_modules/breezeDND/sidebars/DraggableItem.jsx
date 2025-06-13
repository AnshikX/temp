import { useCallback } from "react";
import { generateIdFromTemplate } from "../utils/generateIds";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import truncateWithEllipsis from "../../utils/truncateText";

export const DraggableItem = ({ data }) => {
  const getItem = useCallback(() => generateIdFromTemplate(data), [data]);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "HTML",
      item: { getItem },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [data]
  );

  const iconClass = data.icon || "bi-table";

  return (
    <div className="brDnd-cardItem" ref={drag} style={{ opacity }}>
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
