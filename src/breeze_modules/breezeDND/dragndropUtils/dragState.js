const listeners = new Set();

let state = {
  isDragging: false,
  data: null,
};

// Notifies all subscribed components of a state change
const notify = () => {
  for (const listener of listeners) {
    listener(state);
  }
};

export const dragState = {
  get: () => state,

  set: (newState) => {
    state = { ...state, ...newState };
    notify();
  },

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
