import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import RendererPreview from "../RendererPreview";

// Helper to safely navigate object paths
const extractConfig = (filteredParts, item) => {
  let target = item;
  for (const part of filteredParts) {
    if (!target) break;
    target = target?.[part];
  }
  return target;
};

const PreviewMapRenderer = ({ item, fullMetaConfig }) => {
  const [configs, setConfigs] = useState([]);
  const ref = useRef([]);

  useEffect(() => {
    if (!item) return;

    const meta = fullMetaConfig?.[item.id];
    if (meta?.returnStatements?.length) {
      const metaParts = meta.index?.split("<>") || [];

      const filteredPointers = meta.returnStatements.map((stmt) => {
        const returnParts = stmt.index?.split("<>") || [];
        const path = stmt.index.startsWith(meta.index)
          ? returnParts.slice(metaParts.length)
          : returnParts;
        return extractConfig(path, item);
      });

      ref.current = filteredPointers;
      const filteredConfigs = filteredPointers.map((pointer) => pointer?.value);
      setConfigs(filteredConfigs.filter(Boolean));
    } else {
      // fallback path
      const fallbackPointer = extractConfig(
        ["bodyConfig", "statements", "0"],
        item
      );
      if (fallbackPointer) {
        ref.current = [fallbackPointer];
        setConfigs(fallbackPointer.value ? [fallbackPointer.value] : []);
      } else {
        ref.current = [];
        setConfigs([]);
      }
    }
  }, [item, fullMetaConfig]);

  if (configs.length === 0) return null;

  return (
    <div
      id={item.id}
      style={{ position: "relative", zIndex: 0 }}
      className="p-4"
    >
      {configs.map((config, index) => (
        <RendererPreview key={config.id || index} item={config} />
      ))}
    </div>
  );
};

PreviewMapRenderer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    attributes: PropTypes.object,
    bodyConfig: PropTypes.shape({
      statements: PropTypes.array,
    }),
    children: PropTypes.array,
  }).isRequired,
  fullMetaConfig: PropTypes.object, // pass if available
};

export default React.memo(PreviewMapRenderer);
