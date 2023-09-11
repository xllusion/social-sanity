import React, { ReactElement } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormStatus = {
  submitting?: boolean;
  succeeded?: boolean;
  error?: boolean;
};

type FormStatusText = {
  submitting?: string ;
  succeeded?: string;
  error?: string;
};

type FormData = {
  email: string;
};

type Props = {
  formStatus: FormStatus;
  formStatusText?: FormStatusText;
  onSubmit?: (email: string) => void;
};
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
});

const EmailForm: React.FC<Props> = ({ formStatus, formStatusText, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    if (onSubmit) onSubmit(data.email);
    reset();
  };

  const getInputErrorClass = (error: FieldError | undefined): string => {
    return error ? 'border-rose-600' : '';
  };

  const getErrorIndicator = (error: FieldError | undefined): ReactElement => {
    return error ? <span className='text-red-500'>*</span> : <></>;
  };

  const getErrorText = (): ReactElement => {
    for (const [key, value] of Object.entries(errors)) {
      //console.log(`${key}: ${value?.message}`);
      return (
        <p className='text-red-500 text-xs italic -mt-4 max-w-fit'>
          <span role='alert'>{value.message}</span>
        </p>
      );
    }

    if (formStatus.error) {
      return (
        <p className='text-red-500 text-xs italic -mt-4 max-w-fit'>
          <span role='alert'>
            {formStatusText?.error ? formStatusText.error : 'Submit failed, please try again later ...'}
          </span>
        </p>
      );
    }

    if (formStatus.succeeded) {
      return (
        <p className='text-green-500 text-xs italic -mt-4 max-w-fit'>
          <span role='alert'>{formStatusText?.succeeded ? formStatusText.succeeded : 'Thank you for submitting'}</span>
        </p>
      );
    }

    return <></>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-8 w-full'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label htmlFor='email' className='text-base flex gap-1'>
            Email address {getErrorIndicator(errors.email)}
          </label>
          <input
            {...register('email')}
            type='text'
            id='email'
            aria-invalid={errors.email ? 'true' : 'false'}
            placeholder='youremail@email.com'
            className={`w-full box-border border rounded-md ' ${getInputErrorClass(errors.email)}`}
          />
        </div>
      </div>
      <button
        type='submit'
        disabled={formStatus.submitting}
        className='px-8 py-3 font-semibold rounded-md bg-blue-600 text-gray-50'>
        {formStatus.submitting ? (
          <div className='flex justify-center items-center gap-2'>
            <div className='w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white' />
            {formStatusText?.submitting ? formStatusText.submitting : 'Submitting ...'}
          </div>
        ) : (
          'Submit'
        )}
      </button>

      {getErrorText()}
    </form>
  );
};

export default EmailForm;
