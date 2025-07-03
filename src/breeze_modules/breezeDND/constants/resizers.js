const resizerBaseStyle = {
  position: "absolute",
  backgroundColor: "#007bff",
  zIndex: 12,
  pointerEvents: "auto",
};

export const resizers = [
  {
    className: "resizer-top",
    style: {
      ...resizerBaseStyle,
      top: -4,
      left: "50%",
      transform: "translateX(-50%)",
      width: 10,
      height: 8,
      cursor: "n-resize",
    },
  },
  {
    className: "resizer-right",
    style: {
      ...resizerBaseStyle,
      top: "50%",
      right: -4,
      transform: "translateY(-50%)",
      width: 8,
      height: 10,
      cursor: "e-resize",
    },
  },
  {
    className: "resizer-bottom",
    style: {
      ...resizerBaseStyle,
      bottom: -4,
      left: "50%",
      transform: "translateX(-50%)",
      width: 10,
      height: 8,
      cursor: "s-resize",
    },
  },
  {
    className: "resizer-left",
    style: {
      ...resizerBaseStyle,
      top: "50%",
      left: -4,
      transform: "translateY(-50%)",
      width: 8,
      height: 10,
      cursor: "w-resize",
    },
  },
  {
    className: "resizer-top-left",
    style: {
      ...resizerBaseStyle,
      top: -4,
      left: -4,
      width: 10,
      height: 10,
      cursor: "nw-resize",
    },
  },
  {
    className: "resizer-top-right",
    style: {
      ...resizerBaseStyle,
      top: -4,
      right: -4,
      width: 10,
      height: 10,
      cursor: "ne-resize",
    },
  },
  {
    className: "resizer-bottom-left",
    style: {
      ...resizerBaseStyle,
      bottom: -4,
      left: -4,
      width: 10,
      height: 10,
      cursor: "sw-resize",
    },
  },
  {
    className: "resizer-bottom-right",
    style: {
      ...resizerBaseStyle,
      bottom: -4,
      right: -4,
      width: 10,
      height: 10,
      cursor: "se-resize",
    },
  },
];
