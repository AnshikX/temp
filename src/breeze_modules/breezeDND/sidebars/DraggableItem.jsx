import { useCallback } from "react";
import { generateIdFromTemplate } from "../utils/generateIds";
import { useDrag } from "react-dnd";
import tableSvg from "../assets/svgs/table.svg";
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
  return (
    <div className={`brDnd-cardItem ${theme}`} ref={drag} style={{ opacity }}>
      <div className="brDnd-cardImageWrapper">
        <img
          src={data.image || tableSvg}
          alt={data.label}
          className="brDnd-cardImage"
        />
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
