import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export const OverlayRenderer = ({
  children,
  drag,
  zbase = 0,
  itemId,
  ...props
}) => {
  const ref = useRef();

  const el = document.getElementById("contents-" + itemId)?.nextSibling;
  if (el) {
    const computedHeight = window.getComputedStyle(el).height;
    if (parseFloat(computedHeight) <= 0) {
      el.style.height = "10px";
    }
  }

  return (
    <>
      <div
        ref={ref}
        id={"contents-" + itemId}
        style={{ display: "none" }}
      ></div>
      {children}

      <OverlayPill
        sibilingRef={ref}
        zbase={zbase}
        drag={drag}
        {...props}
        id={itemId}
      />
    </>
  );
};

const OverlayPill = ({ sibilingRef, drag, zbase, id, ...props }) => {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    const el = sibilingRef.current?.nextSibling;
    if (!el || !(el instanceof HTMLElement)) return;

    const updatePos = () => {
      const rect = el.getBoundingClientRect();
      setPos({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    updatePos();

    const resizeObserver = new ResizeObserver(updatePos);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(updatePos);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [sibilingRef]);

  if (!pos) return null;

  return (
    <div
      data-overlay-id={id}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        height: pos.height,
        zIndex: zbase + 3,
        pointerEvents: "auto",
      }}
      {...props}
      ref={(node) => drag(node)}
    />
  );
};

OverlayRenderer.propTypes = {
  children: PropTypes.node.isRequired,
  drag: PropTypes.func.isRequired,
  zbase: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

OverlayPill.propTypes = {
  sibilingRef: PropTypes.object.isRequired,
  drag: PropTypes.func.isRequired,
  zbase: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
