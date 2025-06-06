import { useState } from "react";
import PropTypes from "prop-types";

const dummyData = [
  { id: "1", label: "Dashboard" },
  {
    id: "2",
    label: "Settings",
    children: [
      { id: "2-1", label: "Profile" },
      { id: "2-2", label: "Security" },
    ],
  },
  {
    id: "3",
    label: "Projects",
    children: [
      {
        id: "3-1",
        label: "React App",
        children: [
          { id: "3-1-1", label: "Overview" },
          { id: "3-1-2", label: "Code" },
        ],
      },
    ],
  },
];

// Get initials from a label
const getInitials = (label) =>
  label
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export const VerticalSidebar = ({
  title = "Menu",
  collapsed: defaultCollapsed,
  items = dummyData,
  onSelect = (item) => console.log("Selected:", item),
  width = "250px",
  bgColor = "#f8f9fa",
  textColor = "#212529",
  hoverColor = "#e9ecef",
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleCollapse = () => setCollapsed(!collapsed);

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderItem = (item, level = 0) => {
    const hasChildren =
      Array.isArray(item.children) && item.children.length > 0;
    const isExpanded = expandedItems[item.id];

    return (
      <div
        key={item.id}
        style={{ paddingLeft: `${collapsed ? 0 : level * 15}px` }}
      >
        <div
          className="d-flex justify-content-between align-items-center px-2 py-1 rounded"
          style={{
            color: textColor,
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
          onClick={() => {
            if (hasChildren) toggleItem(item.id);
            else onSelect(item);
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = hoverColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <span
            className="d-flex align-items-center"
            style={{
              fontWeight: collapsed ? "bold" : "normal",
              flex: 1,
            }}
          >
            {collapsed ? (
              <span style={{ width: "100%", textAlign: "center" }}>
                {getInitials(item.label)}
              </span>
            ) : (
              item.label
            )}
          </span>

          {!collapsed && hasChildren && (
            <span
              style={{
                marginLeft: "auto",
                paddingLeft: "8px",
                fontWeight: "bold",
              }}
            >
              {isExpanded ? "−" : "+"}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && !collapsed && (
          <div className="ms-2">
            {item.children.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="d-flex flex-column shadow-sm"
      style={{
        width: collapsed ? "50px" : width,
        backgroundColor: bgColor,
        transition: "width 0.3s",
        overflowX: "hidden",
        whiteSpace: "nowrap",
        minHeight: "100vh",
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
        {!collapsed && <strong style={{ color: textColor }}>{title}</strong>}
        <button
          className="btn btn-sm btn-light ms-auto"
          onClick={toggleCollapse}
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>
      <div className="flex-grow-1 px-2 mt-2">
        {items.map((item) => renderItem(item))}
      </div>
    </div>
  );
};

VerticalSidebar.propTypes = {
  title: PropTypes.string,
  collapsed: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      children: PropTypes.array,
    })
  ),
  onSelect: PropTypes.func,
  width: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverColor: PropTypes.string,
};
