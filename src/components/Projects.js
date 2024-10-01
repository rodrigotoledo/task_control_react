// src/components/Projects.js
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useProjectContext } from '../context/ProjectContext';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
const baseURL = process.env.REACT_APP_API_HTTP_ADDRESS

const Projects = () => {
  const { projects, completeProject, destroyProject, isLoadingProjects, refetchProjects } = useProjectContext();
  
  useRefreshOnFocus(refetchProjects);

  useEffect(() => {
    refetchProjects();
  }, [refetchProjects]);

  return (
    <div className="w-full mt-32 px-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Projects</h1>
        <Button
          variant="contained"
          href="/projects/new"
        >
          New project
        </Button>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-2 gap-4 my-10'>
        {!isLoadingProjects && projects?.map((project) => (
          <div key={project.id} className='p-4 rounded-md border-1 border space-y-4 shadow-lg transition-all duration-300 hover:shadow-2xl'>
            <div className='items-center space-x-2 flex-row flex'>
              {project.feature_image_url && (
                <img src={baseURL + project.feature_image_url} alt="Feature Image" className='w-20 h-20 rounded-full' />
              )}
              <div>
                <h1 className='text-xl mb-2'>{project.title}</h1>
                {project.completed_at ? (
                  <span className="bg-green-500 p-1 text-white rounded-lg text-sm">Completed</span>
                ) : (
                  <span className="bg-yellow-500 p-1 text-white rounded-lg text-sm">Pending</span>
                )}
              </div>
            </div>
            
            <ButtonGroup variant="contained" aria-label="Basic button group">
              {!project.completed_at && (
              <Button variant="contained" onClick={() => completeProject(project)}>Mark as Completed</Button>
            )}
              <Button variant="contained" href={`/projects/${project.id}/edit`}>Edit</Button>
              <Button sx={{ backgroundColor: '#FF5733', color: '#FFFFFF' }} variant="contained"  onClick={() => destroyProject(project)}>Destroy</Button>
            </ButtonGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
