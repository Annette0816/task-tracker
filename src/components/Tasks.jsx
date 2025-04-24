import React from 'react';

function Task({ task, onDelete, onEdit, onToggle }) {
  return (
    <li>
      <span 
        style={{ 
          textDecoration: task.completed ? 'line-through' : 'none', 
          cursor: 'pointer' 
        }}
        onClick={() => onToggle(task.id)}
      >
        {task.title}
      </span>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default Task;
