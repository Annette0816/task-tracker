import React from 'react';

function Task({ task, onDelete, onEdit }) {
  return (
    <li>
      <span >
        {task.title}
      </span>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default Task;
