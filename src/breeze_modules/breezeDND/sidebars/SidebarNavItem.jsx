import PropTypes from 'prop-types';
const SidebarNavItem = ({
  icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div className={`brDnd-sidebar-nav-item ${selected ? 'selected' : ''}`} onClick={onClick}>
      <div className="me-2" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <i className={icon}></i>
        <span title={label}>{label}</span>
      </div>
    </div>
  );
};

export default SidebarNavItem;

SidebarNavItem.propTypes = {
  icon: PropTypes.string,
  iconType: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
