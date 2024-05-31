// Navbar.js
import React, { useEffect } from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { useProjectContext } from '../context/ProjectContext';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';


const Navbar = () => {
  const { completedTaskCount, tasksColor, refetchTasks } = useTaskContext();
  const countCompletedTask = completedTaskCount();
  const tasksColorTheme = tasksColor()

  const { completedProjectCount, projectsColor, refetchProjects } = useProjectContext();
  const countCompletedProject = completedProjectCount();
  const projectsColorTheme = projectsColor()

  useRefreshOnFocus(refetchTasks);
  useRefreshOnFocus(refetchProjects);

  useEffect(() => {
    refetchTasks();
  }, [refetchTasks]);

  useEffect(() => {
    refetchProjects();
  }, [refetchProjects]);

  return (
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <FaCheckDouble className='w-10 h-10 m-2' />
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
            <span className={`rounded-full ${tasksColorTheme} text-white w-8 h-8 font-bold items-center justify-center flex`}>{countCompletedTask}</span>
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
            <span className={`rounded-full ${projectsColorTheme} text-white w-8 h-8 font-bold text-center items-center justify-center flex`}>{countCompletedProject}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
