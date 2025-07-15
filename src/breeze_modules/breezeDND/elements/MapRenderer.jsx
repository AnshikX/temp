import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import Renderer from "../Renderer";
import { useSelectedItemId, useSetters } from "../contexts/SelectionContext";
import deepCopy from "../../utils/deepcopy";
import { usePushChanges } from "../contexts/UndoRedoContext";
import { useMetaConfig } from "../contexts/MetaConfigContext";

const extractConfig = (filteredParts, item) => {
  let target = item;
  for (const part of filteredParts) {
    if (!target) break;
    target = target?.[part];
  }
  return target;
};

const MapRendererX = ({
  drag,
  item,
  handleSelect,
  handleMouseOver,
  opacity,
  handleMouseOut,
  heirarchy,
  isPreview,
  updateItem,
  zbase,
}) => {
  const [configs, setConfigs] = useState([]);
  const [currentItem, setCurrentItem] = useState(item);
  
  const { setItemDetails } = useSetters();
  const selectedItemId = useSelectedItemId();
  const { pushChanges } = usePushChanges();
  const { fullMetaConfig } = useMetaConfig();

  const ref = useRef([]);

  const previousConfigRef = useRef(deepCopy(currentItem));

  const updateCurrentItem = useCallback(
    (stateOrCallBack) => {
      setCurrentItem((prev) => {
        let next;
        if (typeof stateOrCallBack === "function") {
          next = stateOrCallBack(prev);
        } else {
          next = stateOrCallBack;
        }
        pushChanges({
          doChanges: updateCurrentItem.bind(null, previousConfigRef.current),
        });
        previousConfigRef.current = deepCopy(next);
        updateItem(next);
        return next;
      });
    },
    [updateItem, pushChanges]
  );

  useEffect(() => {
    if (selectedItemId !== currentItem.id) return;

    const handleMessageEvent = (event) => {
      if (event.data?.source === "BREEZE" && event.data.type === "resource") {
        const { resource } = event.data;
        if (resource.type === "updateItem") {
          updateCurrentItem((item) => {
            console.log(item)
            console.log(resource.itemConfig)
            resource.itemConfig.children = item?.children;
            if (JSON.stringify(resource.itemConfig) !== JSON.stringify(item)) {
              return resource.itemConfig;
            } else {
              return item;
            }
          });
        }
      }
    };

    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, [currentItem.id, selectedItemId, updateCurrentItem]);

  useEffect(() => {
    setCurrentItem(item);
  }, [item]);

  useEffect(() => {
    if (selectedItemId === currentItem.id) {
      setItemDetails({
        config: currentItem,
        setConfig: updateCurrentItem,
      });
    }
  }, [selectedItemId, currentItem, setItemDetails, updateCurrentItem]);

  useEffect(() => {
    const meta = fullMetaConfig?.[currentItem.id];
    if (meta?.returnStatements?.length) {
      const metaParts = meta.index?.split("<>") || [];

      const filteredPointers = meta.returnStatements.map((stmt) => {
        const returnParts = stmt.index?.split("<>") || [];
        const path = stmt.index.startsWith(meta.index)
          ? returnParts.slice(metaParts.length)
          : returnParts;
        return extractConfig(path, currentItem); // ← pointer with `.value`
      });

      ref.current = filteredPointers;

      const filteredConfigs = filteredPointers.map((pointer) => pointer?.value);
      setConfigs(filteredConfigs.filter(Boolean));
    } else {
      const fallbackPointer = extractConfig(
        ["bodyConfig", "statements", "0"],
        currentItem
      );
      if (fallbackPointer) {
        ref.current = [fallbackPointer];
        setConfigs(fallbackPointer.value ? [fallbackPointer.value] : []);
      } else {
        ref.current = [];
        setConfigs([]);
      }
    }
  }, [currentItem, fullMetaConfig]);

  const stableHeirarchy = useMemo(
    () => [...heirarchy, ...configs.map((config) => config?.id)],
    [heirarchy, configs]
  );

  function updateConfigs(index, updatedConfig) {
    if (!ref.current[index]) return;

    ref.current[index].value = updatedConfig;

    // Trigger currentItem update (this may be required to reflect new data)
    updateCurrentItem((prev) => ({ ...prev }));
  }

  if (configs.length === 0) return null;

  return (
    <div
      ref={(node) => drag(node)}
      onClick={handleSelect}
      style={{ opacity, zIndex: zbase, position: "relative" }}
      onMouseOver={handleMouseOver}
      id={currentItem.id}
      onMouseOut={handleMouseOut}
      className="p-4"
    >
      {configs.map((config, index) => (
        <Renderer
          key={config.id || index}
          item={config}
          heirarchy={stableHeirarchy}
          isPreview={isPreview}
          updateItem={(updatedItem) => updateConfigs(index, updatedItem)}
        />
      ))}
    </div>
  );
};

MapRendererX.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    attributes: PropTypes.object,
    bodyConfig: PropTypes.shape({
      statements: PropTypes.array,
    }),
    children: PropTypes.array,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  drag: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
  updateItem: PropTypes.func.isRequired,
  heirarchy: PropTypes.array.isRequired,
  isPreview: PropTypes.bool.isRequired,
  zbase: PropTypes.number.isRequired,
};

export default React.memo(MapRendererX);
