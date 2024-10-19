import React, { createContext, useContext, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const TaskContext = createContext();

const getTasks = () => {
  return axios.get('/api/tasks').then((response) => response.data);
};

export const TaskProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useQuery({ queryKey: ['tasks'], queryFn: getTasks, refetchInterval: 1000 });

  const taskMutation = useMutation({
    mutationFn: ({ taskId }) => {
      return axios.patch(`/api/tasks/${taskId}/mark_as_completed`).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const destroyMutation = useMutation({
    mutationFn: ({ taskId }) => {
      if (window.confirm('Are you sure?')) {
        return axios.delete(`/api/tasks/${taskId}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const destroyTask = (task) => {
    destroyMutation.mutate({ taskId: task.id });
  };

  const completeTask = (task) => {
    taskMutation.mutate({ taskId: task.id });
  };

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
      return '#F87171';
    } else if (completionPercentage < 60) {
      return '#FBBF24';
    } else {
      return '#34D399';
    }
  };

  const value = useMemo(
    () => ({
      tasks: data,
      isLoadingTasks: isLoading,
      refetchTasks: refetch,
      completeTask,
      destroyTask,
      completedTaskCount,
      tasksColor: getCompletionColor,
    }),
    [data, isLoading, refetch, taskMutation, destroyMutation]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => useContext(TaskContext);
