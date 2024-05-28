import React, { useState, useEffect } from 'react';
import humanizeString from 'humanize-string';
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_HTTP_ADDRESS;
const baseURL = process.env.REACT_APP_API_HTTP_ADDRESS


const ProjectForm = () => {

  const { register, handleSubmit, setValue } = useForm();
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  const [featureImage, setFeatureImage] = useState('');
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/api/projects/${id}`);
      const completedAtFormatted = new Date(response.data.completed_at).toISOString().slice(0, 16);
      
      setFeatureImage(response.data.feature_image_url);

      setValue('title', response.data.title);
      setValue('completedAt', completedAtFormatted);
      setValue('featureImage', response.data.feature_image_url);
    } catch (errorOnFetchData) {
      console.error('Error fetching project details:', errorOnFetchData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.title) {
      formData.append('title', data.title);
    }else{
      formData.append('title', '');
    }
    
    if (data.completedAt) {
      formData.append('completed_at', data.completedAt);
    }else{
      formData.append('completed_at', '');
    }

    if (data.featureImage && data.featureImage[0] && data.featureImage[0] !== '/' ) {
      formData.append('feature_image', data.featureImage[0]);
    }

    if(!id){
      try {
        await axios.post('/api/projects', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        navigate('/projects');
      } catch (error) {
        setErrors(error.response.data)
      }
    }else{
      try {
        await axios.patch(`/api/projects/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        navigate('/projects');
      } catch (error) {
        setErrors(error.response.data)
      }
    }
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="font-bold text-4xl">{!id ? 'New project' : 'Editing project'}</h1>

      {errors && Object.keys(errors).length > 0 && (
        <div id="error_explanation" className="bg-red-50 text-red-500 px-3 py-2 font-medium rounded-lg mt-3">
          <h2>{Object.keys(errors).length} {Object.keys(errors).length === 1 ? 'error' : 'errors'} prohibited this project from being saved:</h2>
          <ul>
            {Object.entries(errors).map(([field, messages]) => (
              messages.map((message, i) => (
                <li key={`${field}-${i}`}>{`${humanizeString(field)} ${message}`}</li>
              ))
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='contents'>
        <div className="my-5">
          <label>
            Title:
            <input type="text" {...register('title')} className="block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full" />
          </label>
        </div>

        <div className="my-5">
          <label>
            Feature Image:
            <input type="file" {...register('featureImage')} className="block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full" />
            {featureImage && (
              <img src={baseURL + featureImage} alt="Feature Image" className='w-20' />
            )}
          </label>
        </div>

        <div className="my-5">
          <label>
            Completed At:
            <input type="datetime-local" {...register('completedAt')} className="block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full" />
          </label>
        </div>
        <button type="submit" className="rounded-lg py-3 px-5 bg-blue-600 text-white inline-block font-medium cursor-pointer">{!id ? 'Create project' : 'Update project'}</button>
        <Link to="/projects" className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium">
          Back to projects
        </Link>
      </form>
    </div>
  );
};

export default ProjectForm;
