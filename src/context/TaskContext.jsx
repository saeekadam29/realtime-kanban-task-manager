import React, { createContext, useContext, useReducer, useEffect } from "react";
import initialTasks from "../data/initialTasks";

// ---------------------------------------------------------------------------
// 1. Context object — components read/write global task state through this
//    instead of prop-drilling `tasks` and `dispatch` down every level.
// ---------------------------------------------------------------------------
const TaskContext = createContext(null);

const STORAGE_KEY = "kanban-tasks";

// ---------------------------------------------------------------------------
// 2. Reducer — single source of truth for how task state changes.
//    Every mutation goes through one of these four action types.
// ---------------------------------------------------------------------------
function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "MOVE_TASK":
      // payload: { id, status } -> move a card to a different column
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      );

    case "DELETE_TASK":
      // payload: { id }
      return state.filter((task) => task.id !== action.payload.id);

    case "EDIT_TASK":
      // payload: { id, updates: { title?, description?, priority? } }
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates }
          : task
      );

    default:
      // Fail loudly in dev if an unknown action slips through.
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

// Lazy initializer: read localStorage once, on first render only,
// instead of on every render. Falls back to seed data if nothing
// is stored yet or the stored value is corrupted.
function loadInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTasks;
  } catch (err) {
    console.error("Failed to parse tasks from localStorage:", err);
    return initialTasks;
  }
}

// ---------------------------------------------------------------------------
// 3. Provider — wraps the app, owns the reducer, and syncs to localStorage.
// ---------------------------------------------------------------------------
export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, undefined, loadInitialState);

  // Whenever `tasks` changes (any dispatch), persist it. This is the
  // "real-time sync with localStorage" requirement — it runs after every
  // render where `tasks` is a new reference, so page refreshes restore state.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error("Failed to save tasks to localStorage:", err);
    }
  }, [tasks]);

  // Convenience action creators so consumers don't need to know the
  // exact action-object shape. Keeps components' code readable.
  const addTask = (task) =>
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        status: "todo",
        createdAt: Date.now(),
        ...task,
      },
    });

  const moveTask = (id, status) => dispatch({ type: "MOVE_TASK", payload: { id, status } });

  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: { id } });

  const editTask = (id, updates) => dispatch({ type: "EDIT_TASK", payload: { id, updates } });

  const value = { tasks, dispatch, addTask, moveTask, deleteTask, editTask };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// ---------------------------------------------------------------------------
// 4. Custom hook — the useContext wrapper every component actually imports.
//    Throws early if used outside the provider, instead of failing silently.
// ---------------------------------------------------------------------------
export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be used within a <TaskProvider>");
  }
  return ctx;
}
