// src/components/Projects.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
const baseURL = process.env.REACT_APP_API_HTTP_ADDRESS

const Projects = () => {
  const { projects, completeProject, destroyProject, isLoadingProjects } = useProjectContext();
  
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
      <table className="min-w-full border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Project</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoadingProjects && projects.map((project) => (
            <tr key={project.id}>
              <td className="border border-gray-200 px-4 py-2">
                <div className='items-center space-x-2 flex-row flex'>
                  <div>
                    {project.feature_image_url && (
                      <img src={baseURL + project.feature_image_url} alt="Feature Image" className='w-20' />
                    )}
                  </div>
                  <div>
                    {project.title}
                  </div>
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {project.completed_at ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2 space-x-2">
                {!project.completed_at && (
                  <Link
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => completeProject(project)}
                  >
                    Mark as Completed
                  </Link>
                )}
                <Link
                  to={`/projects/${project.id}/edit`}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Edit
                </Link>
                <Link
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => destroyProject(project)}
                >
                  Destroy
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
