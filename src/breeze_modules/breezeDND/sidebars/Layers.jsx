import { useState } from "react";
import PropTypes from "prop-types";
import MapsLayers from "./MapLayers";
import { useSetters, useSelectedItemId } from "../contexts/SelectionContext";
import { useVisibility } from "../contexts/VisibilityContext";
import "../styles/Layers.css";

const Layers = ({
  node,
  level = 0,
  setItem,
  selectedTab,
  treeExpanded = true,
  handleDeleteItem,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { setSelectedItemId } = useSetters();
  const selectedItemId = useSelectedItemId();
  const { toggleVisibility, setHoveredItemId, visibilityState } =
    useVisibility();
  const isVisible = visibilityState[node.id] !== false;

  const handleVisibilityToggle = (e) => {
    e.stopPropagation();
    toggleVisibility(node.id);
    handleSelectItem(node);
  };

  const handleSelectItem = () => {
    setSelectedItemId(node.id);
  };

  const handleMouseOver = () => {
    setHoveredItemId(node.id);
  };

  const handleMouseOut = () => {
    setHoveredItemId(null);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setItem({ ...node, label: newValue });
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setSelectedItemId(node.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteItem(node.id);
  };

  return (
    <div
      hidden={!treeExpanded}
      style={{
        backgroundColor:
          selectedItemId !== node.id
            ? "var(--brDnd-color-secondary)"
            : "var(--brDnd-color-background)",
        color:
          selectedItemId !== node.id
            ? "var(--brDnd-color-text)"
            : "var(--brDnd-color-tertiary)",
      }}
    >
      <div
        className={`brDnd-layers-treeItem ${
          selectedItemId === node.id ? "selected" : ""
        }`}
        onClick={handleSelectItem}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {/* Left: Label & Eye icon */}
        <div className="label-container" style={{ paddingLeft: level * 10 }}>
          <i
            className={`bi bi-eye${isVisible ? "" : "-slash"} mt-1`}
            style={{ cursor: "pointer", flexShrink: 0 }}
            onClick={handleVisibilityToggle}
          ></i>

          {isEditing && node.id === selectedItemId ? (
            <input
              type="text"
              defaultValue={node.label || node.tagName || node.elementType}
              autoFocus
              onChange={handleInputChange}
              onBlur={() => setIsEditing(false)}
              style={{ width: "100%" }}
            />
          ) : (
            <span onDoubleClick={handleDoubleClick}>
              {node.label || node.tagName || node.elementType}
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="actions">
          {node.children?.length > 0 && (
            <i
              className={`bi bi-chevron-${expanded ? "up" : "down"}`}
              style={{ cursor: "pointer" }}
              onClick={() => setExpanded(!expanded)}
            />
          )}
          {level !== 0 && (
            <i
              className="bi bi-trash"
              style={{ cursor: "pointer" }}
              onClick={handleDelete}
            />
          )}
        </div>
      </div>

      {node.elementType === "MAP" && expanded && (
        <div className="treeChildren">
          <MapsLayers
            node={node}
            handleSelect={handleSelectItem}
            selectedTab={selectedTab}
            handleDeleteItem={handleDeleteItem}
            level={level + 1}
            setItem={setItem}
          />
        </div>
      )}
      {node.elementType === "CONDITIONAL" && expanded && (
        <div className="ps-2">
          {node.trueCase && (
            <Layers
              node={{
                ...node.trueCase,
                label: "Conditional (True Case)",
              }}
              level={level}
              setItem={setItem}
              selectedTab={selectedTab}
              handleDeleteItem={handleDeleteItem}
            />
          )}

          {node.falseCase && (
            <Layers
              node={{
                ...node.falseCase,
                label: "Conditional (False Case)",
              }}
              level={level}
              setItem={setItem}
              selectedTab={selectedTab}
              handleDeleteItem={handleDeleteItem}
            />
          )}
        </div>
      )}
      {expanded && node.children && (
        <div className="treeChildren">
          {node.children.map((child) => (
            <Layers
              key={child.id}
              node={child}
              level={level + 1}
              setItem={setItem}
              selectedTab={selectedTab}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Layers.propTypes = {
  node: PropTypes.object.isRequired,
  level: PropTypes.number,
  setItem: PropTypes.func,
  selectedTab: PropTypes.object,
  treeExpanded: PropTypes.bool,
  handleDeleteItem: PropTypes.func.isRequired,
};

export default Layers;
