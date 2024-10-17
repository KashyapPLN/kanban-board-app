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
  ]);

  const moveTaskBetweenSections = (sourceSectionId, destinationSectionId, sourceIndex, destinationIndex, task) => {
    // Update source section (remove task)
    const updatedSourceTasks = Array.from(sections.find(s => s.id === sourceSectionId).tasks);
    updatedSourceTasks.splice(sourceIndex, 1);

    // Update destination section (add task)
    const updatedDestinationTasks = Array.from(sections.find(s => s.id === destinationSectionId).tasks);
    const updatedTask = { ...task, status: destinationSectionId }; // Update task status if needed
    updatedDestinationTasks.splice(destinationIndex, 0, updatedTask);

    // Update sections with modified tasks
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
      return; // Dropped outside any droppable area
    }
    const sourceSectionId = source.droppableId;
    const destinationSectionId = destination.droppableId;

    if (sourceSectionId === destinationSectionId) {
      // Reordering within the same section (handled elsewhere)
    } else {
      // Moving to a different section
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