import React from 'react';
import './TaskCard.css';
import { IoIosMore } from 'react-icons/io';
import { Dropdown } from 'react-bootstrap';

const TaskCard = ({ task, deleteTask }) => {
  const formatDueDate = (dueDate) => {
    const today = new Date();
    const date = new Date(dueDate);
    
    // Get the difference in time
    const diffTime = date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    
    // Convert difference to days
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === -1) {
      return <span className="yesterday">Yesterday</span>;
    } else if (diffDays === 1) {
      return <span className="tomorrow">Tomorrow</span>;
    } else {
      return dueDate;
    }
  };

  return (
    <div className="task-card">
      <h5>{task.name}</h5>
      <p>{task.description}</p>
      <small>Assignee: {task.assignee}</small>      
      <br />
      <small>Due: {formatDueDate(task.dueDate)}</small>
      {/* <button className="more-btn" onClick={deleteTask}><IoIosMore /></button> */}
      <Dropdown className="more-dropdown">
        <Dropdown.Toggle 
          as="button" 
          className="more-btn" 
          id="dropdown-custom-components"
        >
        <IoIosMore />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={deleteTask}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TaskCard;
