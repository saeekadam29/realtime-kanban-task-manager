/**
 * initialTasks.js
 * ----------------
 * Default seed data shown the very first time the app loads
 * (i.e. before anything has been written to localStorage).
 *
 * Shape of a task object — keep this consistent everywhere in the app:
 * {
 *   id: string            -> unique id (we use Date.now() + random suffix)
 *   title: string
 *   description: string
 *   priority: "High" | "Medium" | "Low"
 *   status: "todo" | "inprogress" | "completed"
 *   createdAt: number      -> epoch ms, used for sorting/debug
 * }
 */

const initialTasks = [
  {
    id: "task-1",
    title: "Design Kanban board layout",
    description: "Sketch the 3-column grid and card structure in Figma.",
    priority: "High",
    status: "todo",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "task-2",
    title: "Set up TaskContext with useReducer",
    description: "Wire ADD_TASK, MOVE_TASK, DELETE_TASK, EDIT_TASK actions.",
    priority: "High",
    status: "inprogress",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "task-3",
    title: "Add localStorage persistence",
    description: "Sync task state to localStorage using useEffect.",
    priority: "Medium",
    status: "inprogress",
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: "task-4",
    title: "Write README",
    description: "Document setup steps and folder structure for the repo.",
    priority: "Low",
    status: "completed",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "task-5",
    title: "Implement search & priority filter",
    description: "Real-time filtering with useMemo for performance.",
    priority: "Medium",
    status: "todo",
    createdAt: Date.now() - 1000 * 60 * 30,
  },
];

export default initialTasks;
