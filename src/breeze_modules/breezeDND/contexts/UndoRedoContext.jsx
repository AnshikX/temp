import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { asFrameClient, asFrameHost } from "../postMessageBridge";

const UndoRedoContext = createContext();
const PushChangesContext = createContext();

export const UndoRedoProvider = ({ children, renderMode }) => {
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const undidChanges = useRef(false);
  const reDidChanges = useRef(false);
  const sequenceRef = useRef(0);

  const syncing = useRef({
    undoStack: [],
    redoStack: [],
  });

  const pushChanges = useCallback((changeDetails) => {
    changeDetails.sequence = sequenceRef.current;

    if (undidChanges.current) {
      setTimeout(() => {
        undidChanges.current = false;
      }, 0);
      setRedoStack((prev) => [...prev, changeDetails]);
    } else {
      setUndoStack((prevStack) => [...prevStack, changeDetails]);
      if (!reDidChanges.current) {
        setTimeout(() => {
          reDidChanges.current = false;
        }, 0);
        setRedoStack([]);
      }
    }
  }, []);

  const undoChanges = useCallback(() => {
    undidChanges.current = true;

    setUndoStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;

      const newStack = [...prevStack];
      const changeDetails = newStack.pop();
      changeDetails.doChanges();

      while (
        newStack.length > 0 &&
        newStack[newStack.length - 1].sequence === changeDetails.sequence
      ) {
        const groupedChange = newStack.pop();
        groupedChange.doChanges();
      }
      return newStack;
    });
  }, []);

  const redoChanges = useCallback(() => {
    setRedoStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;

      const newStack = [...prevStack];
      const changeDetails = newStack.pop();
      changeDetails.doChanges();

      while (
        newStack.length > 0 &&
        newStack[newStack.length - 1].sequence === changeDetails.sequence
      ) {
        const groupedChange = newStack.pop();
        groupedChange.doChanges();
      }
      return newStack;
    });
    reDidChanges.current = true;
  }, []);

  // Bump sequence once per render
  sequenceRef.current += 1;

  // useEffect(() => {
  //   const msg = ["SYNC_UNDO_REDO", { undoStack, redoStack }];

  //   const sameUndo = syncing.current.undoStack === undoStack;
  //   const sameRedo = syncing.current.redoStack === redoStack;

  //   if (!sameUndo || !sameRedo) {
  //     syncing.current.undoStack = undoStack;
  //     syncing.current.redoStack = redoStack;

  //     (renderMode === "HOST" ? asFrameHost : asFrameClient).sendRequest(...msg);
  //   }
  // }, [undoStack, redoStack, renderMode]);

  // useEffect(() => {
  //   let messageBridge;
  //   messageBridge = renderMode === "CLIENT" ? asFrameClient : asFrameHost;

  //   messageBridge.registerHandler(
  //     "SYNC_UNDO_REDO",
  //     ({ undoStack, redoStack }) => {
  //       syncing.current.undoStack = undoStack;
  //       syncing.current.redoStack = redoStack;
  //       setUndoStack(undoStack);
  //       setRedoStack(redoStack);
  //     }
  //   );

  //   return () => {
  //     messageBridge.removeHandler("SYNC_UNDO_REDO");
  //   };
  // }, [renderMode]);

  return (
    <PushChangesContext.Provider value={{ pushChanges }}>
      <UndoRedoContext.Provider
        value={{ undoChanges, redoChanges, undoStack, redoStack }}
      >
        {children}
      </UndoRedoContext.Provider>
    </PushChangesContext.Provider>
  );
};

UndoRedoProvider.propTypes = {
  children: PropTypes.node.isRequired,
  renderMode: PropTypes.oneOf(["HOST", "CLIENT"]).isRequired,
};

export const useUndoRedo = () => useContext(UndoRedoContext);
export const usePushChanges = () => useContext(PushChangesContext);
