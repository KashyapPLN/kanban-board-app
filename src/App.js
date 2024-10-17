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
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return; // If dropped outside any droppable area
    }

    const sourceSection = sections.find(s => s.id === source.droppableId);
    const destinationSection = sections.find(s => s.id === destination.droppableId);

    if (sourceSection === destinationSection) {
      // Reordering within the same section
      const newTasks = Array.from(sourceSection.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      const updatedSection = { ...sourceSection, tasks: newTasks };
      setSections(sections.map(s => (s.id === sourceSection.id ? updatedSection : s)));
    } else {
      // Moving to a different section
      const sourceTasks = Array.from(sourceSection.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      const destinationTasks = Array.from(destinationSection.tasks);
      const updatedTask = { ...movedTask, status: destinationSection.id !== 'todo' && destinationSection.id !== 'in-progress' && destinationSection.id !== 'done' ? 'review' : destinationSection.id };
      destinationTasks.splice(destination.index, 0, updatedTask);

      const updatedSource = { ...sourceSection, tasks: sourceTasks };
      const updatedDestination = { ...destinationSection, tasks: destinationTasks };

      setSections(sections.map(s => {
        if (s.id === sourceSection.id) return updatedSource;
        if (s.id === destinationSection.id) return updatedDestination;
        return s;
      }));
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
