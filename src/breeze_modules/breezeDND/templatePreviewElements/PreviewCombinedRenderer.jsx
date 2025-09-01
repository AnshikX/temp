import React, { useMemo } from "react";
import PropTypes from "prop-types";
import PreviewSwitchRenderer from "./PreviewSwitchRenderer";
import RendererPreview from "../RendererPreview";
import { getValue } from "../utils/processAttributesFunction";

const PreviewCombinedRenderer = ({ item: config }) => {

  const processedAttributes = useMemo(() => {
    if (!config.attributes) return {};

    const result = {};
    const entries = Object.entries(config.attributes);

    for (const [key, value] of entries) {
      if (key.startsWith("on") || key === "href") continue;

      if (key === "style" && value?.type === "OBJECT") {
        const computedStyles = {};

        if (Array.isArray(value.properties)) {
          for (const item of value.properties) {
            computedStyles[item.name] = item.value.value;
          }
        }

        if (!Object.prototype.hasOwnProperty.call(computedStyles, "padding")) {
          computedStyles["padding"] = "4px";
        }

        result[key] = computedStyles;
      } else {
        result[key] = getValue(value);
      }
    }

    return result;
  }, [config.attributes]);

  const appliedStyles = useMemo(() => {
    return { ...processedAttributes.style };
  }, [processedAttributes]);

  // Recursively render children using RendererPreview
  const renderedChildren = useMemo(() => {
    return config.children?.map((child) => (
      <RendererPreview key={child?.id} item={child} />
    ));
  }, [config.children]);

  return (
    <PreviewSwitchRenderer item={{ ...config, appliedStyles }}>
      {renderedChildren} {/* Render the recursively processed children */}
    </PreviewSwitchRenderer>
  );
};

PreviewCombinedRenderer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    elementType: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    children: PropTypes.array,
  }).isRequired,
};

export default React.memo(PreviewCombinedRenderer, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});
