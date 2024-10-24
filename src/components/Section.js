import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard.js';
import './Section.css';
import Modal from 'react-bootstrap/Modal';
import { IoIosMore } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Dropdown } from 'react-bootstrap';

const Section = ({ section, sections, setSections, boardId }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false);; setSectionId(''); }
  const handleShow = () => setShow(true);

  const [showRename, setShowRename] = useState(false);
  const handleRenameClose = () => { setShowRename(false); setSectionId(''); }
  const handleRenameShow = () => setShowRename(true);
  const [newName, setNewName] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [employees, setEmployees] = useState('');
  const [newTask, setNewTask] = useState({ name: '', description: '', dueDate: '', assignee: '' });

  useEffect(() => {
    async function getAllEmployees() {
      try {
        const response = await fetch('https://kanban-board-app-backend.onrender.com/employees');

        if (!response.ok) {
          throw new Error(`Error   
 fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setEmployees(data);

      } catch (error) {
        console.log(error);
      }
    }
    getAllEmployees();
  }, [])

  async function updateSection() {
    if (sectionId !== '') {
      const req = {
        title: newName
      }
      try {
        const response = await fetch(`https://kanban-board-app-backend.onrender.com/sections/${boardId}/${sectionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req),
        });

        if (!response.ok) {
          throw new Error(`Error   
fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setSections(prevSections => prevSections.map(section => {
          if (section._id === data._id) {
            return data;
          }
          return section;
        }));
        handleRenameClose();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleSectionDelete(boardId, sectionId) {
    try {
      const response = await fetch(`https://kanban-board-app-backend.onrender.com/sections/${boardId}/${sectionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        setSections(data);
      } else {
        console.error('Error deleting section:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const addSectionTask = (sId) => {
    setSectionId(sId);
    handleShow();
  }

  async function handleAddtask() {
    setNewTask({
      ...newTask,
      id: `task-${section.id}-${uuidv4()}`,
    });
    try {
      const response = await fetch(`https://kanban-board-app-backend.onrender.com/tasks/${boardId}/${sectionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Error   
fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      const updatedSection = { ...section, tasks: [...section.tasks, data] };
      setSections(sections.map((s) => (s.id === section.id ? updatedSection : s)));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const addTask = () => {
    if (newTask.name !== '' && newTask.assignee !== '' && newTask.assignee !== 'select' && newTask.dueDate !== '') {
      handleAddtask();
      setNewTask({ name: '', description: '', dueDate: '', assignee: '', });

    }
  };

  async function handleDeleteTask(taskId, sectId) {
    try {
      const response = await fetch(`https://kanban-board-app-backend.onrender.com/tasks/${boardId}/${sectId}/${taskId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        setSections(data);
      } else {
        console.error('Error deleting section:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  }

  const deleteTask = (taskId, sectId) => {
    handleDeleteTask(taskId, sectId);
  };

  return (

    <div className="section" id={section.id}>
      <div className='section-title-div'>
        <h5>{section.title}</h5>
        <div className='section-title-btns-div'>
          <button className='section-title-btn' onClick={() => addSectionTask(section._id)}><GoPlus /></button>
          <Dropdown className="section-title-btn">
            <Dropdown.Toggle
              as="button"
              className="options-btn"
              id="dropdown-custom-components"
            >
              <IoIosMore />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { handleRenameShow(); setSectionId(section._id); }}>Rename Section</Dropdown.Item>
              <Dropdown.Item onClick={(e) => handleSectionDelete(boardId, section._id)}>Delete Section</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </div>
      <Droppable droppableId={section._id}>
        {(provided) => (<div className='section-content' ref={provided.innerRef}
          {...provided.droppableProps}>
          <div className="tasks">
            {section.tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard key={task._id} task={task} deleteTask={() => deleteTask(task._id, section._id)} employees={employees ? employees : null} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {section.id === 'todo' || section.id === 'in-progress' ?
            <button className='section-content-add-task-btn' onClick={() => addSectionTask(section._id)}>+ Add Task</button> : null}
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
                <select
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                >
                  {/* Add options here based on your implementation */}
                  <option value="select">Select Assignee</option>
                  {employees && employees.map(employee => <option key={employee._id} value={employee._id}>{employee.name}</option>)}
                </select>
                <div className='modal-btn-div'>
                  <button onClick={addTask}>Add Task</button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {provided.placeholder}
        </div>)}
      </Droppable>
      <Modal show={showRename} onHide={handleRenameClose} centered>
        <Modal.Header style={{ borderBottom: 'none' }} closeButton>
          <Modal.Title style={{ fontSize: '16px' }}>Section Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-section-form">
            <input
              type="text"
              placeholder="Section Name"
              onChange={(e) => setNewName(e.target.value)}
            />
            <div className='modal-btn-div'>
              <button onClick={() => updateSection()}>Rename Section</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Section;
