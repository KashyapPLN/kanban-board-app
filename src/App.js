import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard.js';
import './App.css';
import Navbar from './components/Navbar.js';

function App() {
  const [sections, setSections] = useState([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'in-progress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ]);

  return (
    <div className="app-container">
      <Navbar/>
      <KanbanBoard sections={sections} setSections={setSections} />
    </div>
  );
}

export default App;
