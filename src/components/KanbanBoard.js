import React from 'react';
import Section from './Section.js';
import './KanbanBoard.css';

const KanbanBoard = ({ sections, setSections }) => {
  const addSection = () => {
    const newSection = {
      id: `section-${sections.length + 1}`,
      title: 'New Section',
      tasks: [],
    };
    setSections([...sections, newSection]);
  };

  return (
    <div className="kanban-board">
      {sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          sections={sections}
          setSections={setSections}
        />
      ))}
      <button className="add-section-btn" onClick={addSection}>
        + Add Section
      </button>
    </div>
  );
};

export default KanbanBoard;
