import React, { useEffect, useState } from 'react';
import Section from './Section.js';
import './KanbanBoard.css';
import { Modal } from 'react-bootstrap';

const KanbanBoard = ({ sections, setSections, boardId }) => {
  const [sectionName, SetSectionName] = useState('New Section');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addSection = () => {
    const newSection = {
      id: `section-${sections.length + 1}`,
      title: sectionName,
      tasks: [],
      boardId
    };
    addNewSection(newSection);

  };

  async function addNewSection(newSection) {

    try {
      const response = await fetch('https://kanban-board-app-backend.onrender.com/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSection),
      });

      if (!response.ok) {
        throw new Error(`Error   
fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setSections([...sections, data.section]);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="kanban-board">
      {sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          sections={sections}
          setSections={setSections}
          boardId={boardId}
        />
      ))}
      <button className="add-section-btn" onClick={handleShow}>
        + Add Section
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={{ borderBottom: 'none' }} closeButton>
          <Modal.Title style={{ fontSize: '16px' }}>Section Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-section-form">
            <input
              type="text"
              placeholder="Section Name"
              onChange={(e) => SetSectionName(e.target.value)}
            />
            <div className='modal-btn-div'>
              <button onClick={addSection}>Add Section</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KanbanBoard;
