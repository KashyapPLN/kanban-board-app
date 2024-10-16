import React, { useState } from 'react';
import TaskCard from './TaskCard.js';
import './Section.css';

const Section = ({ section, sections, setSections }) => {
  const [newTask, setNewTask] = useState({ name: '', description: '', dueDate: '', assignee: '' });

  const addTask = () => {
    const updatedSection = { ...section, tasks: [...section.tasks, { ...newTask, id: `task-${section.tasks.length + 1}` }] };
    setSections(sections.map((s) => (s.id === section.id ? updatedSection : s)));
    setNewTask({ name: '', description: '', dueDate: '', assignee: '' });
  };

  const deleteTask = (taskId) => {
    const updatedSection = { ...section, tasks: section.tasks.filter((task) => task.id !== taskId) };
    setSections(sections.map((s) => (s.id === section.id ? updatedSection : s)));
  };

  return (
    <div className="section">
      <h3>{section.title}</h3>
      <div className="tasks">
        {section.tasks.map((task) => (
          <TaskCard key={task.id} task={task} deleteTask={() => deleteTask(task.id)} />
        ))}
      </div>
      <div className="add-task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type="text"
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
        <button onClick={addTask}>+ Add Task</button>
      </div>
    </div>
  );
};

export default Section;
