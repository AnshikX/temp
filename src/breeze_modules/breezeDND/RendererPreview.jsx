import PropTypes from "prop-types";
import PreviewTextRenderer from "./templatePreviewElements/PreviewTextRenderer";
import PreviewCombinedRenderer from "./templatePreviewElements/PreviewCombinedRenderer";
import PreviewMapRenderer from "./templatePreviewElements/PreviewMapRenderer";
import PreviewConditionalRenderer from "./templatePreviewElements/PreviewConditionalRenderer";
// import { useMetaConfig } from "./contexts/MetaConfigContext";
import React from "react";

const RendererPreview = ({ item }) => {
  // const { fullMetaConfig } = useMetaConfig();

  if (!item) return null;

  const type = (item.elementType || "").toUpperCase();

  if (type === "TEXT") {
    return <PreviewTextRenderer item={item} />;
  }

  if (["HTML", "COMPONENT", "THIRD_PARTY", "BREEZE_COMPONENT"].includes(type)) {
    return <PreviewCombinedRenderer item={item} />;
  }
  // if (type === "MAP") {
  //   return <PreviewMapRenderer item={item} fullMetaConfig={fullMetaConfig} />;
  // }

  if (type === "CONDITIONAL") {
    return <PreviewConditionalRenderer item={item} />;
  }

  const renderedChildren =
    Array.isArray(item.children) && item.children.length > 0
      ? item.children.map((child) => (
          <RendererPreview key={child.id} item={child} />
        ))
      : null;

  return (
    <div>
      {renderedChildren}
      {!renderedChildren && (
        <div>Unknown element: {item.elementType || "N/A"}</div>
      )}
    </div>
  );
};

RendererPreview.propTypes = {
  item: PropTypes.shape({
    elementType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    attributes: PropTypes.object,
    children: PropTypes.array,
  }).isRequired,
};

export default React.memo(RendererPreview);
