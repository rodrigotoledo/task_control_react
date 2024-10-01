// Navbar.js
import React, { useEffect } from 'react';
import { FaBriefcase, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { useProjectContext } from '../context/ProjectContext';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const StyledAvatar = styled(Avatar)`
  ${({ theme, color_theme }) => `
    cursor: pointer;
    background-color: ${color_theme};
    transition: ${theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.standard,
    })};
    &:hover {
      background-color: ${color_theme};
      transform: scale(1.3);
    }
  `}
`;

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
    <nav className="bg-gray-800 p-4 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold flex flex-row items-center">
          <FaCheckDouble className='w-10 h-10 m-2' /> Tasks & Projects
        </Link>
        <div className="flex space-x-4">
          <Link to="/tasks" className="flex items-center space-x-2">
            <FaTasks className="mr-2" />
            Tasks
            <StyledAvatar color_theme={tasksColorTheme}>{countCompletedTask}</StyledAvatar>
          </Link>
          <Link to="/projects" className="flex items-center space-x-2">
            <FaBriefcase className="mr-2" />
            Projects
            <StyledAvatar color_theme={projectsColorTheme}>{countCompletedProject}</StyledAvatar>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
