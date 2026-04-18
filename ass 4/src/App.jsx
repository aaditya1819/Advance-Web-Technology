import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { CheckSquare } from 'lucide-react';

function TodoApp() {
  const [tasks, setTasks] = useLocalStorage('react-todo-tasks', []);
  const location = useLocation();

  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Filter tasks based on current route
  const filteredTasks = useMemo(() => {
    if (location.pathname === '/active') {
      return tasks.filter((task) => !task.completed);
    }
    if (location.pathname === '/completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks; // '/'
  }, [tasks, location.pathname]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app-container">
      <div className="header">
        <h1>
          <CheckSquare style={{ verticalAlign: 'middle', marginRight: '8px' }} color="var(--accent-color)" size={32} />
          Task Master
        </h1>
        <div className="task-stats">
          <span>{totalCount} Total Tasks</span>
          <span>&bull;</span>
          <span>{completedCount} Completed</span>
          <span>&bull;</span>
          <span>{totalCount - completedCount} Pending</span>
        </div>
      </div>

      <TaskInput addTask={addTask} />

      <div className="filters">
        <NavLink to="/" className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}>
          All
        </NavLink>
        <NavLink to="/active" className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}>
          Pending
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => `filter-btn ${isActive ? 'active' : ''}`}>
          Completed
        </NavLink>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
