import { useCallback } from "react";
import { generateIdFromTemplate } from "../utils/generateIds";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

export const DraggableItem = ({ data, theme }) => {
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

  // const isCard = data.type === "third_party";

  // if (isCard) {
  // console.log(data)
  const iconClass = data.icon || "bi-table";

  return (
    <div className={`brDnd-cardItem ${theme}`} ref={drag} style={{ opacity }}>
      <div className="brDnd-cardImageWrapper">
      <i className={`bi ${iconClass} fs-4 brDnd-cardIcon`} />
      </div>
      <div className="brDnd-cardLabel">{data.label}</div>
    </div>
  );
  // }

  // return (
  //   <div
  //     className={`brDnd-sideBarItem ${theme === "dark" ? "dark" : "light"}`}
  //     ref={drag}
  //     style={{ opacity }}
  //   >
  //     {safeLabel}
  //   </div>
  // );
};

DraggableItem.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
};
