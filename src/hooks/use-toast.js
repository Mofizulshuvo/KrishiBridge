import React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 10000; // shorter for demo

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map();

const listeners = [];
let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST": {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }

    case "UPDATE_TOAST": {
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    }

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Add to remove queue
      const addToRemoveQueue = (id) => {
        if (toastTimeouts.has(id)) return;

        const timeout = setTimeout(() => {
          toastTimeouts.delete(id);
          dispatch({ type: "REMOVE_TOAST", toastId: id });
        }, TOAST_REMOVE_DELAY);

        toastTimeouts.set(id, timeout);
      };

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((t) => addToRemoveQueue(t.id));
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      };
    }

    case "REMOVE_TOAST": {
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }

    default:
      return state;
  }
}

// Toast API
function toast(props) {
  const id = genId();

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  const update = (newProps) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...newProps, id } });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return { id, dismiss, update };
}

// Hook
function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const dismissToast = (toastId) =>
    dispatch({ type: "DISMISS_TOAST", toastId });

  return {
    ...state,
    toast,
    dismiss: dismissToast,
  };
}

export { useToast, toast };
