import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';

export function TaskItem({ task, toggleTaskCompleted, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim().length === 0) return;
    editTask(task.id, editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      <label className="task-checkbox-container">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompleted(task.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flex: 1 }}>
          <input
            type="text"
            className="task-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="task-actions">
            <button type="submit" className="icon-btn save" title="Save">
              <Check size={18} />
            </button>
            <button type="button" className="icon-btn delete" onClick={handleCancelEdit} title="Cancel">
              <X size={18} />
            </button>
          </div>
        </form>
      ) : (
        <>
          <span className={`task-content ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </span>
          <div className="task-actions">
            <button
              className="icon-btn edit"
              onClick={() => setIsEditing(true)}
              title="Edit Task"
            >
              <Pencil size={18} />
            </button>
            <button
              className="icon-btn delete"
              onClick={() => deleteTask(task.id)}
              title="Delete Task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
