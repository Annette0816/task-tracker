import React from 'react';
import Task from './Tasks';

function TaskList({ tasks, onDelete, onEdit, onToggle }) {
  return (
    <ul>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
