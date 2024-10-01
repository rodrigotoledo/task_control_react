// src/components/Tasks.js
import React, { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useRefreshOnFocus } from '../hooks/useRefreshOnFocus';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
const baseURL = process.env.REACT_APP_API_HTTP_ADDRESS

const Tasks = () => {
  const { tasks, completeTask, destroyTask, isLoadingTasks, refetchTasks } = useTaskContext();

  useRefreshOnFocus(refetchTasks);

  useEffect(() => {
    refetchTasks();
  }, [refetchTasks]);
  
  return (
    <div className="w-full mt-32 px-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <Button
          variant="contained"
          href="/tasks/new"
        >
          New task
        </Button>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-2 gap-4 my-10'>
        {!isLoadingTasks && tasks?.map((task) => (
          <div key={task.id} className='p-4 rounded-md border-1 border space-y-4 shadow-lg transition-all duration-300 hover:shadow-2xl'>
            <div className='items-center space-x-2 flex-row flex'>
              {task.feature_image_url && (
                <img src={baseURL + task.feature_image_url} alt="Feature Image" className='w-20 h-20 rounded-full' />
              )}
              <div>
                <h1 className='text-xl mb-2'>{task.title}</h1>
                {task.completed_at ? (
                  <span className="bg-green-500 p-1 text-white rounded-lg text-sm">Completed</span>
                ) : (
                  <span className="bg-yellow-500 p-1 text-white rounded-lg text-sm">Pending</span>
                )}
              </div>
            </div>
            
            <ButtonGroup variant="contained" aria-label="Basic button group">
              {!task.completed_at && (
              <Button variant="contained" onClick={() => completeTask(task)}>Mark as Completed</Button>
            )}
              <Button variant="contained" href={`/tasks/${task.id}/edit`}>Edit</Button>
              <Button sx={{ backgroundColor: '#FF5733', color: '#FFFFFF' }} variant="contained" onClick={() => destroyTask(task)}>Destroy</Button>
            </ButtonGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
