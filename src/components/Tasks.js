// src/components/Tasks.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
const baseURL = process.env.REACT_APP_API_HTTP_ADDRESS

const Tasks = () => {
  const { tasks, completeTask, destroyTask, isLoadingTasks, refetchTasks } = useTaskContext();

  useRefreshOnFocus(refetchTasks);

  useEffect(() => {
    refetchTasks();
  }, [refetchTasks]);
  
  return (
    <div className="mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <Link
          to="/tasks/new"
          className="rounded-lg py-3 px-5 bg-blue-600 text-white block font-medium"
        >
          New task
        </Link>
      </div>
      <table className="min-w-full border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Task</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoadingTasks && tasks?.map((task) => (
            <tr key={task.id}>
              <td className="border border-gray-200 px-4 py-2">
                <div className='items-center space-x-2 flex-row flex'>
                  <div>
                    {task.feature_image_url && (
                      <img src={baseURL + task.feature_image_url} alt="Feature Image" className='w-20' />
                      )}
                  </div>
                  <div>
                    {task.title}
                  </div>
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {task.completed_at ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <div className="flex space-x-2">
                  {!task.completed_at && (
                    <button
                      className="bg-blue-500 text-white p-2 rounded text-nowrap"
                      onClick={() => completeTask(task)}
                    >
                      Mark as Completed
                    </button>
                  )}
                  <Link
                    to={`/tasks/${task.id}/edit`}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => destroyTask(task)}
                  >
                    Destroy
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
