import React, { useState, useMemo } from "react";
import { TaskProvider, useTasks } from "./context/TaskContext";
import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import FilterBar from "./components/FilterBar";
import KanbanColumn from "./components/KanbanColumn";

const COLUMNS = [
  { status: "todo", title: "To Do", accentClass: "kanban-column__header--todo" },
  { status: "inprogress", title: "In Progress", accentClass: "kanban-column__header--inprogress" },
  { status: "completed", title: "Completed", accentClass: "kanban-column__header--completed" },
];

/**
 * Board
 * -----
 * Everything that needs `useTasks()` lives here, inside the provider.
 * Keeping this separate from `App` means the provider itself stays a
 * thin wrapper with no rendering logic of its own.
 */
function Board() {
  const { tasks, addTask, moveTask, deleteTask, editTask } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // null = "add" mode
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // ---- Modal handlers --------------------------------------------------
  function openAddModal() {
    setEditingTask(null);
    setIsModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function handleModalSubmit(formData) {
    if (editingTask) {
      editTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
    closeModal();
  }

  // ---- Derived data (useMemo) -------------------------------------------
  // Recomputes only when tasks, searchTerm, or priorityFilter actually
  // change — avoids re-filtering the full list on every unrelated render
  // (e.g. when the modal's internal form state changes).
  const filteredTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        term === "" ||
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term);

      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, priorityFilter]);

  // Group the already-filtered tasks by column, in one pass, memoized
  // alongside the filtered list so KanbanColumn only re-renders when its
  // own slice of data changes.
  const tasksByColumn = useMemo(() => {
    const grouped = { todo: [], inprogress: [], completed: [] };
    for (const task of filteredTasks) {
      grouped[task.status]?.push(task);
    }
    return grouped;
  }, [filteredTasks]);

  return (
    <div className="app-shell">
      <Header onAddClick={openAddModal} taskCount={tasks.length} />

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        resultCount={filteredTasks.length}
      />

      <main className="kanban-board">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            title={col.title}
            accentClass={col.accentClass}
            tasks={tasksByColumn[col.status]}
            onMove={moveTask}
            onDelete={deleteTask}
            onEdit={openEditModal}
          />
        ))}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        editingTask={editingTask}
      />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  );
}
