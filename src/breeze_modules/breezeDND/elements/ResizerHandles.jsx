import PropTypes from "prop-types";
import { resizers } from "../constants/resizers";

const ResizerHandles = ({ isVisible, startResize, pos }) => {
  if (!isVisible) return null;

  return resizers.map((resizer, index) => (
    <div
      key={index}
      className={resizer.className}
      style={resizer.style}
      onMouseDown={startResize(resizer.className, pos)}
    />
  ));
};

ResizerHandles.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  startResize: PropTypes.func.isRequired,
  pos: PropTypes.object.isRequired,
};

export default ResizerHandles;
