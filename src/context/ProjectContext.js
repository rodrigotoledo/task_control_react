import React, { createContext, useContext, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const ProjectContext = createContext();

const getProjects = () => {
  return axios.get('/api/projects').then((response) => response.data);
}

export const ProjectProvider = ({children}) => {
  const queryClient = useQueryClient()
  const { data, isLoading, refetch } = useQuery({ queryKey: ['projects'], queryFn: getProjects })


  const projectMutation = useMutation({
    mutationFn: ({projectId}) => {
      return axios.patch(`/api/projects/${projectId}/mark_as_completed`).then((response) => response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })

  const destroyMutation = useMutation({
    mutationFn: ({projectId}) => {
      if (window.confirm('Are you sure?')) {
        return axios.delete(`/api/projects/${projectId}`)
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })

  const destroyProject = (project) => {
    destroyMutation.mutate({projectId: project.id})
  }

  const completeProject = (project) => {
    projectMutation.mutate({projectId: project.id})
  }

  const completedProjectCount = () => {
    return !isLoading && data.filter((project) => project.completed_at).length;
  };

  const getCompletionColor = () => {
    if (isLoading) {
      return 'gray'; 
    }

    const count = completedProjectCount();
    const completionPercentage = (count / data.length) * 100;

    if (completionPercentage < 30) {
      return 'bg-red-500';
    } else if (completionPercentage < 60) {
      return 'bg-orange-500';
    } else {
      return 'bg-green-500';
    }
  };

  const value = useMemo(
    () => ({
      projects: data,
      isLoadingProjects: isLoading,
      refetchProjects: refetch,
      completeProject,
      destroyProject,
      completedProjectCount,
      projectsColor: getCompletionColor,
    }),
    [data, isLoading, refetch, projectMutation, destroyMutation]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};