import React, { useState } from "react";
import TaskCard from "./TaskCard";

/**
 * KanbanColumn
 * ------------
 * One column ("To Do" / "In Progress" / "Completed"). Owns just enough
 * local UI state (`isDragOver`) to highlight itself while a card is
 * being dragged over it — that's transient UI state, so it stays local
 * instead of living in the global TaskContext.
 */
export default function KanbanColumn({ status, title, accentClass, tasks, onMove, onDelete, onEdit }) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault(); // required to allow a drop
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) onMove(taskId, status);
  }

  return (
    <section
      className={`kanban-column ${isDragOver ? "kanban-column--drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className={`kanban-column__header ${accentClass}`}>
        <h2>{title}</h2>
        <span className="counter-chip">{tasks.length}</span>
      </header>

      <div className="kanban-column__list">
        {tasks.length === 0 && <p className="kanban-column__empty">No tasks here.</p>}

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </section>
  );
}
