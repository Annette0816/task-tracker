import React, { useState, useEffect } from 'react';

function TaskForm({ onAdd, onUpdate, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    } else {
      setTitle('');
    }
  }, [editingTask]);

  function handleAdd(e) {
    e.preventDefault();
    if (title.trim() === '') return;
    onAdd(title);
    setTitle('');
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (title.trim() === '') return;
    onUpdate(editingTask.id, title);
    setTitle('');
  }

  return (
    <form>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      {!editingTask ? (
        <button onClick={handleAdd}>Add Task</button>
      ) : (
        <>
          <button onClick={handleUpdate}>Update Task</button>
          <button type="button" onClick={onCancelEdit}>Cancel</button>
        </>
      )}
    </form>
  );
}

export default TaskForm;
