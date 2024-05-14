import React, { createContext, useContext } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import axios from 'axios';

const TaskContext = createContext();

const getTasks = () => {
  return axios.get('/api/tasks').then((response) => response.data);
}

export const TaskProvider = ({children}) => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['tasks'], queryFn: getTasks })


  const taskMutation = useMutation({
    mutationFn: ({taskId}) => {
      return axios.patch(`/api/tasks/${taskId}/mark_as_completed`).then((response) => response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const destroyMutation = useMutation({
    mutationFn: ({taskId}) => {
      if (window.confirm('Are you sure?')) {
        return axios.delete(`/api/tasks/${taskId}`)
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const destroyTask = (task) => {
    destroyMutation.mutate({taskId: task.id})
  }

  const completeTask = (task) => {
    taskMutation.mutate({taskId: task.id})
  }

  const completedTaskCount = () => {
    return !isLoading && data.filter((task) => task.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'gray'; 
    }

    const count = completedTaskCount();
    const completionPercentage = (count / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-500';
    } else if (completionPercentage < 60) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  };

  return <TaskContext.Provider value={{tasks: data, destroyTask: destroyTask, completeTask: completeTask, isLoadingTasks: isLoading, completedTaskCount: completedTaskCount, tasksColor: getCompletionColor }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};