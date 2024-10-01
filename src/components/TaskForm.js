import React, { useState, useEffect } from 'react';
import humanizeString from 'humanize-string';
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useForm } from "react-hook-form"
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_HTTP_ADDRESS

const TaskForm = () => {

  const { register, handleSubmit, setValue } = useForm();
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  const [featureImage, setFeatureImage] = useState('');
  const [errors, setErrors] = useState([]);
  const queryClient = useQueryClient();

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`/api/tasks/${id}`);
      const completedAtFormatted = response.data.completed_at && new Date(response.data.completed_at).toISOString().slice(0, 16);
      const scheduledAtFormatted = response.data.scheduled_at && new Date(response.data.scheduled_at).toISOString().slice(0, 16);
      
      setFeatureImage(response.data.feature_image_url);

      setValue('title', response.data.title);
      setValue('scheduledAt', scheduledAtFormatted);
      setValue('completedAt', completedAtFormatted);
      setValue('featureImage', response.data.feature_image_url);
    } catch (errorOnFetchData) {
      console.error('Error fetching task details:', errorOnFetchData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTaskDetails();
    }
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.title) {
      formData.append('title', data.title);
    }else{
      formData.append('title', '');
    }

    if (data.scheduledAt) {
      formData.append('scheduled_at', data.scheduledAt);
    }else{
      formData.append('scheduled_at', '');
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
        await axios.post('/api/tasks', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        navigate('/tasks');
      } catch (error) {
        setErrors(error.response.data)
      }
    }else{
      try {
        await axios.patch(`/api/tasks/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        navigate('/tasks');
      } catch (error) {
        setErrors(error.response.data)
      }
    }
  };

  return (
    <div className="w-full mt-32 px-10">
      <h1 className="font-bold text-4xl">{!id ? 'New task' : 'Editing task'}</h1>

      {errors && Object.keys(errors).length > 0 && (
        <div id="error_explanation" className="bg-red-50 text-red-500 px-3 py-2 font-medium rounded-lg mt-3">
          <h2>{Object.keys(errors).length} {Object.keys(errors).length === 1 ? 'error' : 'errors'} prohibited this task from being saved:</h2>
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
            Scheduled At:
            <input type="datetime-local" defaultValue="" {...register('scheduledAt')} className="block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full" />
          </label>
        </div>

        <div className="my-5">
          <label>
            Completed At:
            <input type="datetime-local" defaultValue="" {...register('completedAt')} className="block shadow rounded-md border border-gray-200 outline-none px-3 py-2 mt-2 w-full" />
          </label>
        </div>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button variant="contained" type='submit'>{!id ? 'Create task' : 'Update task'}</Button>
          <Button href='/tasks' variant="contained" sx={{ backgroundColor: '#F3F4F6', color: '#000000' }}>Back</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default TaskForm;
