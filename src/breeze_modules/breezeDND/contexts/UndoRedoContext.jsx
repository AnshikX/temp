import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { asFrameClient } from "../postMessageBridge";

const UndoRedoContext = createContext();
const PushChangesContext = createContext();

export const UndoRedoProvider = ({ children }) => {
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const undidChanges = useRef(0);
  const reDidChanges = useRef(0);
  const sequenceRef = useRef(0);

  console.log("SQUENCE", sequenceRef.current);
  console.log("UNDO", undoStack);
  console.log("REDO", redoStack);

  const pushChanges = useCallback((changeDetails) => {
    changeDetails.sequence = sequenceRef.current;
    // if (changeDetails.sequence === null) {
    //   changeDetails.sequence = sequenceRef.current;
    // }

    console.log(undidChanges.current);
    if (undidChanges.current > 0) {
      undidChanges.current--;
      setRedoStack((prev) => [...prev, changeDetails]);
    } else {
      setUndoStack((prevStack) => [...prevStack, changeDetails]);
      console.log(reDidChanges.current);
      if (reDidChanges.current > 0) {
        reDidChanges.current--;
      } else {
        setRedoStack([]);
      }
    }
  }, []);

  const undoChanges = useCallback(() => {
    sequenceRef.current++;

    setUndoStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;
      const newStack = [...prevStack];

      const changeDetails = newStack.pop();
      undidChanges.current =
        newStack.filter((item) => item.sequence === changeDetails.sequence)
          .length + 1;

      changeDetails.doChanges();

      console.log(undidChanges.current);

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
    sequenceRef.current++;
    setRedoStack((prevStack) => {
      if (prevStack.length === 0) return prevStack;

      const newStack = [...prevStack];
      const changeDetails = newStack.pop();

      reDidChanges.current =
        newStack.filter((item) => item.sequence === changeDetails.sequence)
          .length + 1;

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
    // reDidChanges.current = true;
  }, []);

  // 🔑 helper for grouping multiple changes
  const withGroupedChanges = useCallback((fn) => {
    const currentSeq = ++sequenceRef.current;
    fn(currentSeq); // pass the sequence in case child functions need it
    // do NOT bump sequence here, let provider bump once per render
  }, []);

  // Bump sequence once per render
  // sequenceRef.current += 1;

  useEffect(() => {
    asFrameClient.sendEvent("UNDO_REDO_STATUS", {
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
    });
  }, [undoStack.length, redoStack.length]);

  useEffect(() => {
    asFrameClient.on("UNDO_CHANGES", undoChanges);
    asFrameClient.on("REDO_CHANGES", redoChanges);
    return () => {
      asFrameClient.off("UNDO_CHANGES", undoChanges);
      asFrameClient.off("REDO_CHANGES", redoChanges);
    };
  }, [undoChanges, redoChanges]);

  return (
    <PushChangesContext.Provider value={{ pushChanges, withGroupedChanges }}>
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
};

export const useUndoRedo = () => useContext(UndoRedoContext);
export const usePushChanges = () => useContext(PushChangesContext);
