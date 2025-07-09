import PropTypes from "prop-types";
import Layers from "./Layers";
import { useEffect, useState } from "react";
import { useMetaConfig } from "../contexts/MetaConfigContext";

const extractConfig = (filteredParts, item) => {
  if (!filteredParts) return null;
  let target = item;
  for (const part of filteredParts) {
    if (!target) break;
    target = target?.[part];
  }
  return target?.value || null;
};

const MapLayers = ({ node, handleSelect, selectedTab, handleDeleteItem, level }) => {
  const [metaConfig, setMetaConfig] = useState(null);
  const [selectedConfigPaths, setSelectedConfigPaths] = useState([]);
  const { fullMetaConfig } = useMetaConfig();

  useEffect(() => {
    const found = fullMetaConfig?.[node.id];
    if (found?.returnStatements) {
      setMetaConfig(found);
    } else {
      setMetaConfig({
        id: node.id,
        index: "",
        returnStatements: [{ index: "bodyConfig<>statements<>0" }],
      });
    }
  }, [node.id, fullMetaConfig]);

  useEffect(() => {
    if (metaConfig?.returnStatements?.length) {
      const metaParts = metaConfig.index?.split("<>") || [];
      const newPaths = metaConfig.returnStatements.map((stmt) => {
        const returnParts = stmt.index?.split("<>") || [];
        return stmt.index?.startsWith(metaConfig.index)
          ? returnParts.slice(metaParts.length)
          : returnParts;
      });
      setSelectedConfigPaths(newPaths);
    }
  }, [metaConfig]);
  
  return (
    <>
      {selectedConfigPaths.map((path, index) => {
        const childNode = extractConfig(path, node);
        if (!childNode) return null;
        return (
          <Layers
            key={index}
            node={{ ...childNode, label: `Return ${index + 1}` }}
            handleSelect={handleSelect}
            selectedTab={selectedTab}
            level={level}
            handleDeleteItem={handleDeleteItem}
          />
        );
      })}
    </>
  );
};

MapLayers.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  item: PropTypes.object,
  selectedTab: PropTypes.object,
  handleDeleteItem: PropTypes.func.isRequired,
  level: PropTypes.number,
  fullMetaConfig: PropTypes.object,
};

export default MapLayers;
