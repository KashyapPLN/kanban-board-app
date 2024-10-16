import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, deleteTask }) => {
  return (
    <div className="task-card">
      <h4>{task.name}</h4>
      <p>{task.description}</p>
      <small>Due: {task.dueDate}</small>
      <br />
      <small>Assignee: {task.assignee}</small>
      <button className="more-btn" onClick={deleteTask}>...</button>
    </div>
  );
};

export default TaskCard;
