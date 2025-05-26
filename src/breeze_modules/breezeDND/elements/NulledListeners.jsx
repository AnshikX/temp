const reactDomEventListeners = [
    // Mouse Events
    "onClick",
    "onContextMenu",
    "onDoubleClick",
    // "onDrag",
    // "onDragEnd",
    // "onDragEnter",
    // "onDragExit",
    // "onDragLeave",
    // "onDragOver",
    // "onDragStart",
    // "onDrop",
    // "onMouseDown",
    // "onMouseEnter",
    // "onMouseLeave",
    // "onMouseMove",
    // "onMouseOut",
    // "onMouseOver",
    // "onMouseUp",
  
    // Touch Events
    // "onTouchCancel",
    // "onTouchEnd",
    // "onTouchMove",
    // "onTouchStart",
  
    // Keyboard Events
    // "onKeyDown",
    // "onKeyPress", // deprecated
    // "onKeyUp",
  
    // Focus Events
    // "onFocus",
    // "onBlur",
  
    // Form Events
    "onChange",
    "onInput",
    "onInvalid",
    "onReset",
    "onSubmit",
  
    // Composition Events
    // "onCompositionEnd",
    // "onCompositionStart",
    // "onCompositionUpdate",
  
    // Pointer Events
    // "onPointerDown",
    // "onPointerMove",
    // "onPointerUp",
    // "onPointerCancel",
    // "onPointerEnter",
    // "onPointerLeave",
    // "onPointerOver",
    // "onPointerOut",
  
    // Clipboard Events
    "onCopy",
    "onCut",
    "onPaste",
  
    // Media Events
    "onAbort",
    "onCanPlay",
    "onCanPlayThrough",
    "onDurationChange",
    "onEmptied",
    "onEncrypted",
    "onEnded",
    "onLoadedData",
    "onLoadedMetadata",
    "onLoadStart",
    "onPause",
    "onPlay",
    "onPlaying",
    "onProgress",
    "onRateChange",
    "onSeeked",
    "onSeeking",
    "onStalled",
    "onSuspend",
    "onTimeUpdate",
    "onVolumeChange",
    "onWaiting",
  
    // Image Events
    "onLoad",
    "onError",
  
    // Animation Events
    "onAnimationStart",
    "onAnimationEnd",
    "onAnimationIteration",
  
    // Transition Events
    "onTransitionEnd",
    "onTransitionStart", // experimental/new
  
    // Misc
    // "onWheel",
    // "onScroll",
    // "onToggle" // for <details>
];
function nulledListner(e){
    e.preventDefault()
}

const nulledEventAttrs ={}
reactDomEventListeners.forEach(x=>{
    nulledEventAttrs[x] = nulledListner
})

export default nulledEventAttrs