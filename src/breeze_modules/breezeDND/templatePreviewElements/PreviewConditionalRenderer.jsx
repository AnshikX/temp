// PreviewConditionalRenderer.jsx
import PropTypes from "prop-types";
import RendererPreview from "../RendererPreview";

const PreviewConditionalRenderer = ({ item }) => {
  if (!item?.id) return null;

  return (
    <div id={item.id} className="p-4">
      {/* True Case */}
      {item.trueCase && (
        <RendererPreview key={item.trueCase.id} item={item.trueCase} />
      )}

      {/* False Case */}
      {item.falseCase && (
        <>
          <div className="my-3"></div>
          <RendererPreview key={item.falseCase.id} item={item.falseCase} />
        </>
      )}
    </div>
  );
};

PreviewConditionalRenderer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    trueCase: PropTypes.shape({
      id: PropTypes.string.isRequired,
      tagName: PropTypes.string,
      elementType: PropTypes.string,
      attributes: PropTypes.object,
      children: PropTypes.array,
    }),
    falseCase: PropTypes.shape({
      id: PropTypes.string.isRequired,
      tagName: PropTypes.string,
      elementType: PropTypes.string,
      attributes: PropTypes.object,
      children: PropTypes.array,
    }),
  }).isRequired,
};

export default PreviewConditionalRenderer;
