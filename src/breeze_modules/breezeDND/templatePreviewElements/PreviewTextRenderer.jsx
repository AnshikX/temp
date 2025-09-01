// PreviewTextRenderer.jsx
import PropTypes from "prop-types";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackWithReload } from "../utils/FallbackWithReload";

export default function PreviewTextRenderer({ item }) {
  if (!item) return null;

  const boundaryProps = {
    FallbackComponent: (props) => (
      <FallbackWithReload {...props} resetErrorBoundary={() => {}} />
    ),
    resetKeys: [item.id],
  };

  // If this is a variable type
  if (item.textType === "value") {
    return (
      <ErrorBoundary {...boundaryProps}>
        <span style={{ display: "inline", width: "auto" }}>
          ${item.value?.label || "variable"}
        </span>
      </ErrorBoundary>
    );
  }

  // Normal text type
  return (
    <ErrorBoundary {...boundaryProps}>
      <span style={{ display: "inline", width: "auto" }}>
        {item.value || "Empty Text"}
      </span>
    </ErrorBoundary>
  );
}

PreviewTextRenderer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    textType: PropTypes.string,
  }).isRequired,
};
