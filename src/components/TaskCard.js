import React, { useEffect } from 'react';
import './TaskCard.css';
import { IoIosMore } from 'react-icons/io';
import { Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const TaskCard = ({ task, deleteTask, employees }) => {
  const formatDueDate = (dueDate) => {
    const today = new Date();
    const date = new Date(dueDate);
    const diffTime = date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === -1) {
      return <span className="yesterday">Yesterday</span>;
    } else if (diffDays === 1) {
      return <span className="tomorrow">Tomorrow</span>;
    } else {
      const day = date.getDate().toString().padStart(2, '0');
      const month = monthNames[date.getMonth()];
      return `${day} ${month}`;
    }
  };

  return (
    <div className="task-card">
      <h5>{task.name}</h5>
      <p>{task.description}</p>
      <div className='task-details'>
      <section className='task-assignee-section'>
        {task.assignee? <span ><img src={employees && employees.find(employee => employee._id === task.assignee).profilePicture} className='assignee-dp' /></span>:
        <span ><FaUserCircle className='assignee-dp-icon' /></span>}
          <small>{formatDueDate(task.dueDate)}</small>
          </section>
          {task.assignee  && <span className='task-category'>{employees && employees.find(employee => employee._id === task.assignee).team}</span>}
          </div>
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
