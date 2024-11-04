import React, { useEffect, useState } from 'react';
import './TaskCard.css';
import { IoIosMore } from 'react-icons/io';
import { Dropdown, Modal } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const TaskCard = ({ task, deleteTask,editTask, editedTask, setEditedTask, employees }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
useEffect(()=>{
  setEditedTask({
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
    assignee: task.assignee,
})
},[task]);
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
        <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={deleteTask}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={show} onHide={handleClose} centered>
            <Modal.Header style={{ borderBottom: 'none' }} closeButton>
              <Modal.Title style={{ fontSize: '16px' }}>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="add-task-form">
                <input
                  type="text"
                  placeholder="Task Name"
                  value={editedTask.name}
                  onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                />
                <textarea
                  rows={4}
                  cols={52}
                  placeholder="Description"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                />
                <select
                  value={editedTask.assignee}
                  onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
                >
                  {/* Add options here based on your implementation */}
                  <option value="select">Select Assignee</option>
                  {employees && employees.map(employee => <option key={employee._id} value={employee._id}>{employee.name}</option>)}
                </select>
                <div className='modal-btn-div'>
                  <button onClick={()=>{editTask();handleClose();}}>Edit Task</button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
    </div>
  );
};

export default TaskCard;
