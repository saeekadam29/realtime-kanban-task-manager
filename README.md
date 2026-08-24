#🚀 Real-Time Kanban Task Manager
A responsive, dynamic React task management application built with **Vite**. This application features intuitive column-based task tracking, real-time filtering, state management powered by React Hooks, and browser data persistence.
🔗 **Live Demo:**  https://realtime-kanban-task-manager.vercel.app/
✨ Features
3-Column Kanban Board: Easily organize workflow across `To Do`, `In Progress`, and `Completed` status lanes.
Full CRUD Operations: Create, edit, move, and delete tasks seamlessly.
State Management via `useReducer`:Centralized, predictable action dispatching for all task operations (`ADD_TASK`, `MOVE_TASK`, `EDIT_TASK`, `DELETE_TASK`).
Real-time Search & Priority Filter: Filter tasks instantly by title/description or priority levels (High, Medium, Low) using optimized `useMemo` hooks.
Local Storage Persistence: Task state automatically syncs to `local Storage` using `useEffect` to retain data across page reloads.
Responsive Layout: Clean, modern UI designed for smooth interaction across mobile and desktop displays.
🛠️ Tech Stack
Frontend Framework: React (Vite)
State Management: React Context API & `useReducer`
Styling: CSS3 / Modern Flexbox & Grid Layouts
Deployment: Vercel
 📁 Project Structure
realtime-kanban-task-manager/
├── src/
│   ├── components/     # UI components (Board, Columns, Task Cards, Filters)
│   ├── context/        # TaskContext & reducer logic
│   ├── App.jsx         # Main application container
│   └── main.jsx        # Entry point
├── index.html
├── package.json
└── vite.config.js
