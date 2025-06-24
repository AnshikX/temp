import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export const OverlayRenderer = ({
  children,
  drag,
  zbase = 0,
  itemId,
  id,
  ...props
}) => {
  const ref = useRef();
  const el = document.getElementById(itemId);
  if (el) {
    const computedHeight = window.getComputedStyle(el).height;
    if (computedHeight <= "0px") {
      el.style.height = "10px";
    }
  }

  return (
    <>
      <div ref={ref} style={{ display: "contents" }}>
        {children}
      </div>
      <OverlayPill
        sibilingRef={ref}
        zbase={zbase}
        drag={drag}
        {...props}
        id={id}
      />
    </>
  );
};

const OverlayPill = ({ sibilingRef, drag, zbase, id, ...props }) => {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    const updatePos = () => {
      if (sibilingRef.current) {
        const rect =
          sibilingRef.current?.firstElementChild?.getBoundingClientRect();
        setPos({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };
    const timeoutId = setTimeout(updatePos, 500);

    const targetEl = sibilingRef.current?.firstElementChild;
    if (!targetEl) return;

    const resizeObserver = new ResizeObserver(updatePos);
    resizeObserver.observe(targetEl);

    const mutationObserver = new MutationObserver(updatePos);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [sibilingRef]);

  if (!pos) {
    return null;
  }

  return (
    <div
      id={id}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        height: pos.height,
        zIndex: zbase + 3,
        pointerEvents: "auto",
        cursor: "grab",
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
