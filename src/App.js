import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard.js';
import './App.css';
import Navbar from './components/Navbar.js';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const [sections, setSections] = useState([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
    { id: 'review', title: 'Review', tasks: [] },
  ]);

  const moveTaskBetweenSections = (sourceSectionId, destinationSectionId, sourceIndex, destinationIndex, task) => {
    const updatedSourceTasks = Array.from(sections.find(s => s.id === sourceSectionId).tasks);
    updatedSourceTasks.splice(sourceIndex, 1);
    const updatedDestinationTasks = Array.from(sections.find(s => s.id === destinationSectionId).tasks);
    const updatedTask = { ...task, status: destinationSectionId };
    updatedDestinationTasks.splice(destinationIndex, 0, updatedTask);
    setSections(sections.map(section => {
      if (section.id === sourceSectionId) {
        return { ...section, tasks: updatedSourceTasks };
      } else if (section.id === destinationSectionId) {
        return { ...section, tasks: updatedDestinationTasks };
      } else {
        return section;
      }
    }));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sourceSectionId = source.droppableId;
    const destinationSectionId = destination.droppableId;

    if (sourceSectionId === destinationSectionId) {
   
    } else {
        moveTaskBetweenSections(sourceSectionId, destinationSectionId, source.index, destination.index, sections.find(s => s.id === sourceSectionId).tasks[source.index]);
      console.log("destination ",destinationSectionId)
    }
  };

  return (
    <div className="app-container">
      <Navbar/>
      <DragDropContext onDragEnd={onDragEnd}>
      <KanbanBoard sections={sections} setSections={setSections} />
      </DragDropContext>
    </div>
  );
}

export default App;