import React from 'react';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks, toggleTaskCompleted, deleteTask, editTask }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found.</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}
