import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHttpFetch } from '../../hooks/useHttpFetch';

const FORMSPREE_API: string = 'https://formspree.io/f/xeqnvvwv';

type FormValues = {
  name: string;
  email: string;
  phone_number: string;
  company_name: string;
  message: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone_number: yup.number().required(),
  company_name: yup.string(),
  message: yup.string().required(),
});

const ContactForm: React.FC = () => {
  const { status, sendRequest } = useHttpFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    //alert(JSON.stringify(data));
    sendRequest(FORMSPREE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    reset();
  };

  const getInputClass = (error: FieldError | undefined): string => {
    return error ? 'border-2 border-rose-600' : '';
  };

  const getTextareaClass = (error: FieldError | undefined): string => {
    return error ? 'border-2 border-rose-600' : '';
  };

  const getErrorIndicator = (error: FieldError | undefined): ReactElement => {
    return error ? <span className='text-red-400'>*</span> : <></>;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='flex flex-col gap-1 w-full bg-white p-8'>
      <input name='subject' defaultValue='Xllusion contact form' className='hidden' />

      <label htmlFor='name' className='font-bold uppercase'>
        Name {getErrorIndicator(errors.name)}
      </label>
      <input
        id='name'
        type='text'
        placeholder='Full Name'
        {...register('name')}
        className={getInputClass(errors.name)}
      />

      <label htmlFor='email' className='font-bold uppercase mt-4'>
        Email {getErrorIndicator(errors.email)}
      </label>
      <input
        id='email'
        type='email'
        placeholder='Email Address'
        {...register('email')}
        className={getInputClass(errors.email)}
      />

      <label htmlFor='phone_number' className='font-bold uppercase mt-4'>
        Phone Number {getErrorIndicator(errors.phone_number)}
      </label>
      <input
        id='phone_number'
        type='number'
        placeholder='Mobile / Phone'
        {...register('phone_number')}
        className={getInputClass(errors.phone_number)}
      />

      <label htmlFor='company_name' className='font-bold uppercase mt-4'>
        Company {getErrorIndicator(errors.company_name)}
      </label>
      <input
        id='company_name'
        type='text'
        placeholder='Company Name'
        {...register('company_name')}
        className={getInputClass(errors.company_name)}
      />

      <label htmlFor='message' className='font-bold uppercase mt-4'>
        Message {getErrorIndicator(errors.message)}
      </label>
      <textarea
        id='message'
        rows={5}
        placeholder='Message Detail'
        {...register('message')}
        className={getTextareaClass(errors.message)}
      />

      <button
        type='submit'
        disabled={status.submitting}
        className='mt-6 py-3 font-semibold rounded-md bg-blue-600 text-gray-50'>
        {!status.submitting
          ? !status.succeeded
            ? 'Get in touch now'
            : 'Submitted'
          : 'Submitting...'}
      </button>

      {status.succeeded && (
        <p className='text-green-400'>
          Thank you for contacting us, we will get back to you very soon.
        </p>
      )}
      {status.error && <p className='text-red-400'>{status.error}</p>}
    </form>
  );
};

export default ContactForm;
