import { useCallback, useEffect, useState } from "react";
import DropZone from "./DropZone";
import PropTypes from "prop-types";
import { useSelectedItemId, useSetters } from "./contexts/SelectionContext";
import OverlayBar from "./OverlayBar";
import TextRenderer from "./elements/TextRenderer";
import CombinedRenderer from "./elements/CombinedRenderer";
import { useVisibility } from "./contexts/VisibilityContext";
import MapRenderer from "./elements/MapRenderer";
import ConditionalRenderer from "./elements/ConditionalRenderer";
import { useCustomDrag } from "./dragndropUtils/useCustomDrag";
import deepCopy from "../utils/deepcopy";
import { v4 as uuidv4 } from "uuid";
import { asFrameClient } from "./postMessageBridge";

function assignNewIdsRecursively(item) {
  const newItem = { ...item, id: uuidv4() };

  if (Array.isArray(newItem.children)) {
    newItem.children = newItem.children.map(assignNewIdsRecursively);
  }

  return newItem;
}
const Renderer = ({
  item,
  addSibling,
  heirarchy = [],
  prevId = null,
  isFirst = true,
  isPreview,
  updateItem,
  handleDelete,
  overDetails,
  zbase = 0,
  parentId,
}) => {
  const { visibilityState, hoveredItemId } = useVisibility();
  const { setSelectedItemId } = useSetters();

  const selectedItemId = useSelectedItemId();

  const [isHovered, setIsHovered] = useState(false);
  const firstDropZoneHeriarchy = [...heirarchy];
  const isSelected = selectedItemId === item.id;

  const [{ isDragging }, drag] = useCustomDrag(
    {
      type: "HTML",
      item: { item: { ...item }, myOnDrop: handleDelete },
      canDrag: () => (handleDelete ? true : false),
      mode: "same-frame",
    }
    // [item, handleDelete]
  );

  const opacity = isDragging ? 0.5 : 1;
  const isVisible = visibilityState[item.id] !== false;

  useEffect(() => {
    if (hoveredItemId === item.id) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [hoveredItemId, item.id]);

  const handleDrop = useCallback(
    (draggedItem, offset = 0) => {
      addSibling(draggedItem, offset);
    },
    [addSibling]
  );

  if (prevId) {
    firstDropZoneHeriarchy.push(prevId);
  }

  const handleSelect = useCallback(
    (e) => {
      e.stopPropagation();
      if (selectedItemId !== item.id) {
        setSelectedItemId(item.id);
      }
      setIsHovered(false);
    },

    [selectedItemId, item.id, setSelectedItemId, setIsHovered]
  );

  const handleMouseOver = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isSelected) {
        setIsHovered(true);
      }
    },
    [isSelected]
  );

  const handleMouseOut = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isSelected) {
        setIsHovered(false);
      }
    },
    [isSelected]
  );

  const handleDuplicate = useCallback(() => {
    if (!addSibling) return;

    const copied = deepCopy(item);
    const newItem = assignNewIdsRecursively(copied);
    newItem.label = `${item.label || item.tagName || item.elementType} (Copy)`;

    addSibling(newItem, 1);
    // setSelectedItemId(newItem.id);
  }, [addSibling, item]);

  useEffect(() => {
    const func = (data) => {
      if (data.itemId === item.id) {
        handleDelete();
      }
    };

    asFrameClient.on("DELETE_ITEM", func);
    return () => {
      asFrameClient.off("DELETE_ITEM", func);
    };
  }, [item.id, handleDelete]);

  if (!isVisible) {
    return null;
  }
  return (
    <>
      {!isPreview && addSibling && (
        <DropZone
          onDrop={(draggedItem) => handleDrop(draggedItem, 0)}
          position="top"
          heirarchy={firstDropZoneHeriarchy}
          zbase={zbase}
          ownerId={parentId}
        />
      )}
      {item.elementType === "TEXT" ? (
        <TextRenderer
          item={item}
          handleSelect={handleSelect}
          handleMouseOver={handleMouseOver}
          opacity={opacity}
          handleMouseOut={handleMouseOut}
          key={item.id}
          updateItem={updateItem}
          drag={drag}
          isPreview={isPreview}
          zbase={zbase}
        />
      ) : item.elementType === "HTML" ||
        item.elementType === "html" ||
        item.elementType === "COMPONENT" ||
        item.elementType === "THIRD_PARTY" ||
        item.elementType === "BREEZE_COMPONENT" ? (
        <CombinedRenderer
          item={item}
          handleSelect={handleSelect}
          key={item.id}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          heirarchy={heirarchy}
          updateItem={updateItem}
          opacity={opacity}
          drag={drag}
          isPreview={isPreview}
          zbase={zbase}
        />
      ) : item.elementType === "MAP" ? (
        <MapRenderer
          item={item}
          handleSelect={handleSelect}
          drag={drag}
          opacity={opacity}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          heirarchy={heirarchy}
          updateItem={updateItem}
          isPreview={isPreview}
          zbase={zbase}
        />
      ) : item.elementType === "CONDITIONAL" ? (
        <ConditionalRenderer
          item={item}
          handleSelect={handleSelect}
          drag={drag}
          opacity={opacity}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          heirarchy={heirarchy}
          updateItem={updateItem}
          isPreview={isPreview}
          zbase={zbase}
        />
      ) : (
        <div
          className="component"
          ref={(node) => drag(node)}
          onClick={handleSelect}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Unknown Element
        </div>
      )}
      {!isPreview && (
        <OverlayBar
          item={item}
          updateItem={updateItem}
          itemLabel={item.label || item.tagName || item.elementType}
          onDelete={handleDelete}
          isVisible={isHovered || isSelected}
          setIsHovered={setIsHovered}
          isFirst={isFirst}
          overDetails={overDetails}
          onDuplicate={handleDuplicate}
        />
      )}
    </>
  );
};

Renderer.propTypes = {
  item: PropTypes.shape({
    elementType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tagName: PropTypes.string,
    $ref: PropTypes.string,
    label: PropTypes.string,
    attributes: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.arrayOf(
      PropTypes.shape({
        elementType: PropTypes.string.isRequired,
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        children: PropTypes.array,
      })
    ),
  }).isRequired,
  addSibling: PropTypes.func,
  heirarchy: PropTypes.array,
  prevId: PropTypes.string,
  isFirst: PropTypes.bool,
  isPreview: PropTypes.bool.isRequired,
  updateItem: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  overDetails: PropTypes.object,
  zbase: PropTypes.number,
  parentId: PropTypes.string,
};

export default Renderer;
