import React from "react";

/**
 * Header
 * ------
 * Purely presentational: title + a button that tells the parent
 * (App) to open the "add task" modal. No state lives here.
 */
export default function Header({ onAddClick, taskCount }) {
  return (
    <header className="app-header">
      <div className="app-header__title-group">
        <h1 className="app-header__title">Kanban Task Manager</h1>
        <span className="app-header__subtitle">
          <span className="counter-chip">{taskCount}</span> tasks tracked
        </span>
      </div>

      <button className="btn btn--primary" onClick={onAddClick}>
        <span className="btn__icon">+</span> Add Task
      </button>
    </header>
  );
}
