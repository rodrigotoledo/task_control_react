// src/components/Tasks.js
import React from 'react';
import axios from 'axios';
import { useTaskContext } from '../context/TaskContext';

const baseURL = axios.defaults.baseURL;

const Tasks = () => {
  const { tasks, completeTask, isLoadingTasks } = useTaskContext();
  
  return (
    <div className="w-full px-10 mt-8">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Task</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoadingTasks && tasks.map((task) => (
            <tr key={task.id}>
              <td className="border border-gray-200 px-4 py-2">
                {task.title}
                <>
                  {task.feature_image_url && (
                    <img src={baseURL + task.feature_image_url} alt="Feature Image" />
                  )}
                </>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {task.completed_at ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {task.completed_at ? (
                  <span className="text-green-500">{new Date(task.completed_at).toLocaleString()}</span>
                ) : (
                 <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => completeTask(task)}
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
