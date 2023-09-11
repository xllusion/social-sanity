import React, { ReactElement, useRef } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { topics } from '../../utils/constants';

type Props = {
  formStatus: 'idle' | 'submitting' | 'succeeded' | 'error';
  formStatusText?: string;
  onSubmit?: (data: FormValue) => void;
};

export type FormValue = {
  upload: FileList;
  caption: string;
  topic: string;
};

const schema = yup.object().shape({
  upload: yup
    .mixed()
    .test('required', 'You need to provide a file', (value) => {
      return value && value.length;
    })
    .test('fileSize', 'File is too large, requires < 20MB', (value) => {
      return value && value[0] && value[0].size <= 20000000;
    })
    .test('type', 'Only support mp4, webm or ogg', (value) => {
      return (
        value &&
        value[0] &&
        (value[0].type === 'video/mp4' ||
          value[0].type === 'video/webm' ||
          value[0].type === 'video/ogg')
      );
    }),
  caption: yup.string().required('* Required').min(3, '* Minimum 3 letters'),
  topic: yup.string().required(),
});

const UploadVideoForm: React.FC<Props> = ({ formStatus, formStatusText, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<FormValue>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const watchUpload = watch('upload');

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    //alert(JSON.stringify(data));
    if (onSubmit) onSubmit(data);
    reset();
  };

  const getInputErrorClass = (error: FieldError | undefined): string => {
    return error ? 'border-rose-600' : 'border-gray-400';
  };

  const getUploadStatusTextElement = (): ReactElement => {
    if (errors.upload?.message) {
      return (
        <p className='text-red-500 text-sm italic'>
          <span role='alert'>{errors.upload.message}</span>
        </p>
      );
    }
    if (watchUpload && watchUpload[0]) {
      return (
        <p className='text-green-500 text-base italic'>
          <span role='alert'>
            File to upload: 
            {watchUpload[0].name.length > 12
              ? watchUpload[0].name.substring(0, 12)+'...'
              : watchUpload[0].name}            
          </span>
        </p>
      );
    }

    return <p className='text-xl font-semibold'>Select video to upload</p>;
  };

  const getStatusTextElement = (): ReactElement => {
    // for (const [key, value] of Object.entries(errors)) {
    //   //console.log(`${key}: ${value?.message}`);
    //   if (key === 'upload') continue;

    //   return (
    //     <p className='text-red-500 text-xs italic max-w-fit'>
    //       <span role='alert'>{value.message}</span>
    //     </p>
    //   );
    // }

    if (formStatus === 'error') {
      return (
        <p className='text-red-500 text-xs italic'>
          <span role='alert'>
            {formStatusText ? formStatusText : 'Uploading failed, please try again later ...'}
          </span>
        </p>
      );
    }

    if (formStatus === 'succeeded') {
      return (
        <p className='text-green-500 text-xs italic'>
          <span role='alert'>{formStatusText ? formStatusText : 'Thank you for submitting'}</span>
        </p>
      );
    }

    return <></>;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='flex flex-col gap-6 text-gray-600 text-base'>
      <div className='block'>
        <label className='flex flex-col cursor-pointer'>
          <input
            disabled={formStatus === 'submitting'}
            {...register('upload')}
            type='file'
            id='upload'
            className='peer w-0 h-0'
          />
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col p-4 justify-center items-center outline-none w-64 h-fit peer-focus:border-teal-300 hover:border-teal-300 hover:bg-gray-100 gap-4'>
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold text-xl'>
                <FaCloudUploadAlt className='text-gray-300 text-6xl' />
              </p>
              <div className='h-7 flex items-center'>{getUploadStatusTextElement()}</div>
            </div>
            <p className='bg-teal-400 text-center rounded text-white text-md font-semibold p-2 w-52 outline-none'>
              Select file
            </p>
          </div>
        </label>
      </div>

      <div className='block'>
        <label htmlFor='caption' className='text-base flex items-center gap-2'>
          Caption
          {errors.caption && (
            <span className='text-red-500 text-xs italic'>{errors.caption.message} </span>
          )}
        </label>
        <input
          {...register('caption')}
          type='text'
          id='caption'
          aria-invalid={errors.caption ? 'true' : 'false'}
          placeholder=''
          className={`w-full box-border border-2 rounded-md focus:border-teal-400 focus:ring-0 ${getInputErrorClass(
            errors.caption
          )}`}
        />
      </div>

      <div className='block'>
        <label htmlFor='topic' className='text-base flex gap-1'>
          Topic
          {errors.topic && (
            <span className='text-red-500 text-xs italic'> * {errors.topic.message} </span>
          )}
        </label>
        <select
          {...register('topic')}
          className={`capitalize w-full box-border border-2 rounded-md focus:border-teal-400 focus:ring-0 ${getInputErrorClass(
            errors.topic
          )}`}>
          {topics.map((item) => (
            <option key={item.name} value={item.name} className='capitalize'>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        disabled={formStatus === 'submitting'}
        className='px-8 py-3 font-semibold rounded-md bg-teal-400 focus:outline-teal-600 focus:ring-0 text-white'>
        {(!formStatus || formStatus === 'idle') && <span>Upload</span>}
        {formStatus === 'submitting' && (
          <span className='flex justify-center items-center gap-2'>
            <div className='w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white' />
            {formStatusText ? formStatusText : 'Uploading ...'}
          </span>
        )}
        {formStatus === 'succeeded' && (
          <span>{formStatusText ? formStatusText : 'Uploaded successfully'}</span>
        )}
        {formStatus === 'error' && (
          <span className='text-red-700'>
            {formStatusText ? formStatusText : 'Uploading failed ...'}
          </span>
        )}
      </button>
    </form>
  );
};

export default UploadVideoForm;
