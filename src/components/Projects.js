// src/components/Projects.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Projects</h1>
        <Link
          to="/projects/new"
          className="rounded-lg py-3 px-5 bg-blue-600 text-white block font-medium"
        >
          New project
        </Link>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-2 gap-4 my-10'>
        {!isLoadingProjects && projects?.map((project) => (
          <div key={project.id} className='p-4 rounded-md border-1 border space-y-4 shadow-lg'>
            <div className='items-center space-x-2 flex-row flex'>
              {project.feature_image_url && (
                <img src={baseURL + project.feature_image_url} alt="Feature Image" className='w-20' />
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
            
            <div className="flex space-x-2">
              {!project.completed_at && (
                <Link
                className="bg-blue-500 text-white p-1 rounded text-nowrap"
                onClick={() => completeProject(project)}
                >
                  Mark as Completed
                </Link>
              )}
              <Link
                to={`/projects/${project.id}/edit`}
                className="bg-blue-500 text-white p-1 rounded"
              >
                Edit
              </Link>
              <Link
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => destroyProject(project)}
              >
                Destroy
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
