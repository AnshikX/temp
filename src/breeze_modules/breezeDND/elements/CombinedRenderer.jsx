import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import DropZone from "../DropZone";
import Renderer from "../Renderer";
import { useSelectedItemId, useSetters } from "../contexts/SelectionContext";
import { getValue } from "../utils/processAttributesFunction";
import SwitchRenderer from "./SwitchRenderer";
import { usePushChanges } from "../contexts/UndoRedoContext";
import deepCopy from "../../utils/deepcopy";
import { asFrameClient } from "../postMessageBridge";

const CombinedRenderer = ({
  item: config,
  handleSelect,
  handleMouseOver,
  handleMouseOut,
  heirarchy,
  updateItem,
  opacity,
  drag,
  isPreview,
  zbase = 0,
}) => {
  const { setItemDetails } = useSetters();
  const selectedItemId = useSelectedItemId();
  const { pushChanges } = usePushChanges();
  const [currentItem, setCurrentItem] = useState(config);
  const previousConfigRef = useRef(deepCopy(currentItem));
  const removedIndexRef = useRef();
  removedIndexRef.current = null;

  const updateCurrentItem = useCallback(
    (stateOrCallBack) => {
      setCurrentItem((prev) => {
        let next;
        if (typeof stateOrCallBack === "function") {
          next = stateOrCallBack(prev);
        } else {
          next = stateOrCallBack;
        }
        const undoTo = deepCopy(previousConfigRef.current);
        previousConfigRef.current = deepCopy(next);

        setTimeout(() => {
          pushChanges(
            {
              doChanges: updateCurrentItem.bind(null, undoTo),
            },
            undoTo
          );
        }, 0);

        updateItem(next);
        return next;
      });
    },
    [updateItem, pushChanges]
  );

  useEffect(() => {
    setCurrentItem(config);
  }, [config]);

  useEffect(() => {
    if (selectedItemId === currentItem.id) {
      setItemDetails({ config: currentItem });
    }
  }, [selectedItemId, currentItem, setItemDetails]);

  useEffect(() => {
    if (selectedItemId !== currentItem.id) return;

    const handleItemChange = (itemConfig) => {
      updateCurrentItem((item) => {
        itemConfig.children = item?.children;
        if (JSON.stringify(itemConfig) !== JSON.stringify(item)) {
          return itemConfig;
        } else {
          return item;
        }
      });
    };

    asFrameClient.on("updateItemConfig", handleItemChange);
    return () => {
      asFrameClient.off("updateItemConfig", handleItemChange);
    };
  }, [selectedItemId, currentItem.id, updateCurrentItem]);

  useEffect(() => {
    const updateLabel = (data) => {
      updateCurrentItem((prev) => ({
        ...prev,
        label: data.label,
      }));
    };

    asFrameClient.on(`UPDATE_LABEL+${currentItem.id}`, updateLabel);
    return () => {
      asFrameClient.off(`UPDATE_LABEL+${currentItem.id}`, updateLabel);
    };
  }, [currentItem.id, updateCurrentItem]);

  const addChild = useCallback(
    (newChild, offset, index) => {
      updateCurrentItem((prevItem) => {
        let updatedChildren = [...prevItem.children];
        let pos = index + offset;
        if (removedIndexRef.current !== null && removedIndexRef.current < pos) {
          pos = pos - 1;
        }
        updatedChildren.splice(pos, 0, { ...newChild });

        return { ...prevItem, children: updatedChildren };
      });
    },
    [updateCurrentItem]
  );

  const removeChild = useCallback(
    (id) => {
      updateCurrentItem((prevItem) => {
        const updatedItem = { ...prevItem };
        const index = prevItem.children.findIndex((c) => c.id === id);
        if (index !== -1) {
          removedIndexRef.current = index;
          updatedItem.children.splice(index, 1);

          setTimeout(() => {
            removedIndexRef.current = null;
          }, 0);
        }
        return updatedItem;
      });
    },
    [updateCurrentItem]
  );

  const updateChild = useCallback(
    (child) => {
      setCurrentItem((prevItem) => {
        const index = prevItem.children.findIndex((c) => c.id === child.id);
        if (index !== -1) {
          prevItem.children[index] = child;
        } else {
          alert("SOMETHING WENT WRONG Combined renderer updatechild");
        }
        updateItem(prevItem);
        return prevItem;
      });
    },
    [updateItem]
  );

  const stableHeirarchy = useMemo(
    () => [...heirarchy, currentItem.id],
    [currentItem.id, heirarchy]
  );

  const processedAttributes = useMemo(() => {
    if (!currentItem.attributes) return {};

    const result = {};
    const entries = Object.entries(currentItem.attributes);

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
  }, [currentItem.attributes]);

  const appliedStyles = useMemo(() => {
    return { ...processedAttributes.style, opacity };
  }, [processedAttributes, opacity]);
  return (
    <SwitchRenderer
      item={{ ...currentItem, appliedStyles }}
      handleSelect={handleSelect}
      handleMouseOver={handleMouseOver}
      handleMouseOut={handleMouseOut}
      drag={drag}
      opacity={opacity}
      processedAttributes={processedAttributes}
      zbase={zbase}
    >
      {currentItem.children?.map((child, index) => {
        const prevId = index > 0 ? currentItem.children[index - 1].id : null;
        return (
          
          
            <Renderer

              key={child?.id}
              item={child}
              prevId={prevId}
              updateItem={updateChild}
              addSibling={(newChild, offset) =>
                addChild(newChild, offset, index)
              }
              heirarchy={[...stableHeirarchy, child.id]}
              isFirst={false}
              isPreview={isPreview}
              handleDelete={() => removeChild(child.id)}
              zbase={zbase + 20}
              parentId={currentItem.id}
            />
          );
      })}
      {!isPreview && currentItem.children ? (
        currentItem.children.length === 0 ? (
          <DropZone
            key={`${currentItem.id}-drop`}
            onDrop={(addedItem) =>
              addChild(addedItem, 0, currentItem.children.length)
            }
            position="bottom"
            isOnly={true}
            heirarchy={[...stableHeirarchy, currentItem.id]}
            zbase={zbase}
            ownerId={currentItem.id}
          ></DropZone>
        ) : (
          <DropZone
            key={`${currentItem.id}-drop-bottom`}
            onDrop={(addedItem) =>
              addChild(addedItem, 1, currentItem.children.length)
            }
            position="bottom"
            heirarchy={[
              ...stableHeirarchy,
              currentItem.id,
              currentItem.children[currentItem.children.length - 1].id,
            ]}
            zbase={zbase}
            ownerId={currentItem.id}
          />
        )
      ) : null}
    </SwitchRenderer>
  );
};

CombinedRenderer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    elementType: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    children: PropTypes.array,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
  heirarchy: PropTypes.array.isRequired,
  updateItem: PropTypes.func.isRequired,
  drag: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
  zbase: PropTypes.number.isRequired,
};

export default React.memo(CombinedRenderer, (prevProps, nextProps) => {
  return (
    prevProps.item === nextProps.item &&
    JSON.stringify(prevProps.heirarchy) ===
      JSON.stringify(nextProps.heirarchy) &&
    prevProps.handleMouseOver === nextProps.handleMouseOver &&
    prevProps.handleMouseOut === nextProps.handleMouseOut &&
    prevProps.handleSelect === nextProps.handleSelect &&
    prevProps.drag === nextProps.drag &&
    prevProps.updateItem === nextProps.updateItem &&
    prevProps.isPreview === nextProps.isPreview &&
    prevProps.zbase === nextProps.zbase
  );
});
