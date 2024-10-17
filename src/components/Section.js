import React, { useState } from 'react';
import TaskCard from './TaskCard.js';
import './Section.css';
import Modal from 'react-bootstrap/Modal';
import { IoIosMore } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';

const Section = ({ section, sections, setSections }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newTask, setNewTask] = useState({ name: '', description: '', dueDate: '', assignee: '',status:'' });
  const [status,setStatus]=useState(null);

  const addSectionTask = (sectionId) => {
    console.log(sectionId);
    setStatus(sectionId)
    handleShow();
  }

  const addTask = () => {
    if(newTask.name!==''&&newTask.description!==''&&newTask.assignee!==''&&newTask.dueDate!==''&&newTask.status!==null){
      const updatedSection = { ...section, tasks: [...section.tasks, { ...newTask, id: `task-${section.tasks.length + 1}` }] };
      setSections(sections.map((s) => (s.id === section.id ? updatedSection : s)));
      console.log("status is ",status);
      setNewTask({ name: '', description: '', dueDate: '', assignee: '',status:status });
      handleClose();
    }   
  };

  const deleteTask = (taskId) => {
    const updatedSection = { ...section, tasks: section.tasks.filter((task) => task.id !== taskId) };
    setSections(sections.map((s) => (s.id === section.id ? updatedSection : s)));
  };

  return (
    <div className="section" id={section.id}>
      <div className='section-title-div'>
        <h5>{section.title}</h5>
        <div className='section-title-btns-div'>
          <button className='section-title-btn'><GoPlus /></button>
          <button className='section-title-btn'><IoIosMore /></button>
        </div>

      </div>
      <div className='section-content'>
          <div className="tasks">
          {section.tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={() => deleteTask(task.id)} />
          ))}
        </div>
        {section.id === 'todo' || section.id === 'in-progress' ? <button className='section-content-add-task-btn' onClick={() => addSectionTask(section.id)}>+ Add Task</button> : null}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header style={{ borderBottom: 'none' }} closeButton>
            <Modal.Title style={{ fontSize: '16px' }}>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add-task-form">
                 <input
                  type="text"
                  placeholder="Task Name"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                 />
                <textarea 
                rows={4}
                cols={52}
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                />
                <div className='modal-btn-div'>
                  <button onClick={addTask}>Add Task</button>
                </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Section;
