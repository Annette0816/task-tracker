import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import "../App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  function addTask(title) {
    const newTask = {
      userId: 1,
      title,
      completed: false
    };

    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    .then(res => res.json())
    .then(task => setTasks([...tasks, task]));
  }

  function deleteTask(id) {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE'
    })
    .then(() => setTasks(tasks.filter(task => task.id !== id)));
  }

  function startEditing(task) {
    setEditingTask(task);
  }
  function cancelEdit() {
    setEditingTask(null);
  }
  

  function updateTask(id, newTitle) {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle })
    })
    .then(res => res.json())
    .then(updated => {
      setTasks(tasks.map(task =>
        task.id === id ? updated : task
      ));
      setEditingTask(null);
    });
  }

  function toggleComplete(id, completed) {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    .then(res => res.json())
    .then(updated => {
      setTasks(tasks.map(task =>
        task.id === id ? updated : task
      ));
    });
  }
 
  return (
    <div>
      <h1>TaskTracker</h1>
      <TaskForm 
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
        onCancelEdit={cancelEdit}
      />
      <TaskList 
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={startEditing}
        onToggle={(id) => {
          const task = tasks.find(t => t.id === id);
          toggleComplete(id, task.completed);
        }}
      />
    </div>
  );
}

export default App;
