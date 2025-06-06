import PropTypes from "prop-types";

export const HorizontalNavbar = ({
  brand = "MyApp",
  brandLink = "/",
  navItems = [
    { id: "home", label: "Homee" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ],
  backgroundColor = "#343a40",
  textColor = "#ffffff",
  height = "60px",
  itemHoverColor = "#495057",
  fontSize = "1rem",
  paddingX = "1.5rem",
  alignRight = false,
  onNavClick = (item) => console.log("Clicked:", item),
}) => {
  return (
    <nav
      className="d-flex align-items-center justify-content-between shadow"
      style={{
        backgroundColor,
        color: textColor,
        height,
        padding: `0 ${paddingX}`,
        fontSize,
        whiteSpace: "nowrap",
        overflowX: "auto",
      }}
    >
      {/* Brand */}
      <a
        href={brandLink}
        className="navbar-brand fw-bold"
        style={{ color: textColor, textDecoration: "none" }}
      >
        {brand}
      </a>

      {/* Nav Items */}
      <div
        className={`d-flex gap-3 ${alignRight ? "ms-auto" : ""}`}
        style={{ alignItems: "center" }}
      >
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavClick(item)}
            style={{
              cursor: "pointer",
              color: textColor,
              padding: "6px 12px",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = itemHoverColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  );
};

HorizontalNavbar.propTypes = {
  brand: PropTypes.string,
  brandLink: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  height: PropTypes.string,
  itemHoverColor: PropTypes.string,
  fontSize: PropTypes.string,
  paddingX: PropTypes.string,
  alignRight: PropTypes.bool,
  onNavClick: PropTypes.func,
};
