import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function TaskInput({ addTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    addTask(text);
    setText('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-task-btn">
        <Plus size={20} />
        Add
      </button>
    </form>
  );
}
