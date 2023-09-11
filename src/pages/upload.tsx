import axios from 'axios';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import UploadVideoForm, { FormValue } from '../components/form/UploadVideoForm';
import { useAuth } from '../store/auth-context';

type FormStatus = 'idle' | 'submitting' | 'succeeded' | 'error';

const Upload: NextPage = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const { userProfile } = useAuth();

  useEffect(() => {
    if (formStatus === 'succeeded' || formStatus === 'error') {
      const timer = setTimeout(() => {
        setFormStatus('idle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const submitHandler = (data: FormValue) => {
    //console.log(data);
    
    setFormStatus('submitting');

    const formData = new FormData();

    // Add all fields to formData
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
      if((typeof value) === 'string') {
        formData.append(key, value as string);
      }
    }

    // Add additional value (id)
    formData.append('user_id', userProfile ? userProfile?._id : '');
    // Add video file
    formData.append('video', data.upload[0]);
    
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, formData)
      .then((res) => {
        console.log(res.data);
        setFormStatus('succeeded');
      })
      .catch((err) => {
        console.log('Error: ' + err);
        setFormStatus('error');
      });
  };
  return (
    <div className='flex w-full h-full justify-center p-4'>
      <UploadVideoForm formStatus={formStatus} onSubmit={submitHandler} />
    </div>
  );
};

export default Upload;
