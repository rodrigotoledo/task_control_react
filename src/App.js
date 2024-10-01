// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Projects from './components/Projects';
import TaskForm from './components/TaskForm';
import ProjectForm from './components/ProjectForm';
import { TaskProvider } from './context/TaskContext';
import { ProjectProvider } from './context/ProjectContext';

const App = () => {
  return (
    <TaskProvider>
      <ProjectProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/:id/edit" element={<ProjectForm />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </TaskProvider>
  );
};

export default App;
