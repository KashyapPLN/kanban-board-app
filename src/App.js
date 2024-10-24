import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard.js';
import './App.css';
import Navbar from './components/Navbar.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { Spinner } from 'react-bootstrap';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [boardId, setBoardId] = useState('');
  const [sections, setSections] = useState([]);
  useEffect(() => {
    async function getAllBoards() {
      setIsLoading(true);
      try {
        const response = await fetch('https://kanban-board-app-backend.onrender.com/boards');

        if (!response.ok) {
          throw new Error(`Error   
 fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setBoardId(data[0]._id);
        setSections(data[0].sections);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    getAllBoards();
  }, [])


  const moveTaskBetweenSections = (sourceSectionId, destinationSectionId, sourceIndex, destinationIndex, task) => {
    const updatedSourceTasks = Array.from(sections.find(s => s._id === sourceSectionId).tasks);
    updatedSourceTasks.splice(sourceIndex, 1);
    const updatedDestinationTasks = Array.from(sections.find(s => s._id === destinationSectionId).tasks);
    const updatedTask = { ...task, status: destinationSectionId };
    updatedDestinationTasks.splice(destinationIndex, 0, updatedTask);
    setSections(sections.map(section => {
      if (section._id === sourceSectionId) {
        return { ...section, tasks: updatedSourceTasks };
      } else if (section._id === destinationSectionId) {
        return { ...section, tasks: updatedDestinationTasks };
      } else {
        return section;
      }
    }));
    updateSourceSection(sourceSectionId, updatedSourceTasks, destinationSectionId, updatedDestinationTasks);
  };

  async function updateSourceSection(sourceSectionId, sourceTasks, destinationSectionId, desinationTasks) {
    if (sourceSectionId !== '') {
      const req = {
        tasks: sourceTasks
      }
      try {
        const response = await fetch(`https://kanban-board-app-backend.onrender.com/sections/${boardId}/${sourceSectionId}/tasks`, {
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
        updateDestinationSection(destinationSectionId, desinationTasks);

      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updateDestinationSection(destinationSectionId, desinationTasks) {
    if (destinationSectionId !== '') {
      const req = {
        tasks: desinationTasks
      }
      try {
        const response = await fetch(`https://kanban-board-app-backend.onrender.com/sections/${boardId}/${destinationSectionId}/tasks`, {
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
      } catch (error) {
        console.log(error);
      }
    }
  }


  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sourceSectionId = source.droppableId;
    const destinationSectionId = destination.droppableId;

    if (sourceSectionId === destinationSectionId) {

    } else {
      moveTaskBetweenSections(sourceSectionId, destinationSectionId, source.index, destination.index, sections.find(s => s._id === sourceSectionId).tasks[source.index]);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      {isLoading ? <div className='spinner-div mt-5'><Spinner animation="border" role="status" />
        <span>Loading...</span>
      </div> :
        <DragDropContext onDragEnd={onDragEnd}>
          <KanbanBoard sections={sections} setSections={setSections} boardId={boardId} />
        </DragDropContext>
      }
    </div>
  );
}

export default App;