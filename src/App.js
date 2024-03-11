import React, { useState } from 'react';
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const words = newTask.split(' ');
      const quantity = parseInt(words.pop(), 10) || 1;
      const description = words.join(' ');

      const taskList = [];
      for (let i = 0; i < quantity; i++) {
        taskList.push({ id: Date.now() + i, description, completed: false, count: 0 });
      }
      setTasks([...tasks, ...taskList]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, count: task.count + 1 } : task
      )
    );
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <li key={task.id} className='list-container'>
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.description} (Updated {task.count} Times)
        </span>
        <div>
          <button onClick={() => handleUpdateTask(task.id)} className='edit-icon'>
            <FontAwesomeIcon icon={faPencilAlt} size='2x'/>
          </button>
          <button onClick={() => handleDeleteTask(task.id)} className='dlt-icon'>
            <FontAwesomeIcon icon={faTimes} size='2x'/>
          </button>
        </div>
        
      </li>
    ));
  };

  return (
    <div className='bg-container'>
      <div className='main-container'>
        <h1>Day Goals!</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Add a task..."
              value={newTask}
              onChange={handleInputChange}
              className="task-input"
            />
          </div>
          <div>
            <button onClick={handleAddTask} className="add-btn">
              Add Todo
            </button>
          </div>
        </div>
        <ul>{renderTasks()}</ul>
      </div>
    </div>
  );
}

export default ToDoList;








