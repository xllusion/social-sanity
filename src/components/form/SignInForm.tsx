import React, { forwardRef, ReactElement, ReactNode, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormStatus = {
  submitting?: boolean;
  succeeded?: boolean;
  error?: boolean;
};

type FormStatusText = {
  submitting?: string;
  succeeded?: string;
  error?: string;
};

type FormData = {
  email: string;
  password: string;
};

type Props = {
  mode: 'signIn' | 'signUp';
  formStatus: FormStatus;
  formStatusText?: FormStatusText;
  onSubmit?: (email: string, password: string) => void;
  onForgotPassword?: () => void;
};

export type SignInFormHandle = {
  getFormElement: () => HTMLFormElement | null;
};

const SignInForm = forwardRef<SignInFormHandle, Props>(
  ({ mode, formStatus, formStatusText, onSubmit, onForgotPassword }, ref) => {
    useImperativeHandle(ref, () => ({
      getFormElement() {
        return formRef.current;
      },
    }));

    const formRef = useRef<HTMLFormElement>(null);

    const schema = yup.object().shape({
      email: yup.string().required('Email is required').email('Email is not valid'),
      password:
        mode === 'signIn'
          ? yup.string().required('Password is required')
          : yup
              .string()
              .required('Password is required')
              .min(8, 'Password must be at 8 char long')
              .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                'Password must contain at least one uppercase, one number and one special case character'
              ),
    });

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
      //alert(JSON.stringify(data));
      if (onSubmit) onSubmit(data.email, data.password);
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
              {formStatusText?.error
                ? formStatusText.error
                : 'Submit failed, please try again later ...'}
            </span>
          </p>
        );
      }

      if (formStatus.succeeded) {
        return (
          <p className='text-green-500 text-xs italic -mt-4 max-w-fit'>
            <span role='alert'>
              {formStatusText?.succeeded ? formStatusText.succeeded : 'Thank you for submitting'}
            </span>
          </p>
        );
      }

      return <></>;
    };

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmitHandler)}
        className='flex flex-col gap-8 w-full'>
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
              className={`w-full box-border border rounded-md ' ${getInputErrorClass(
                errors.email
              )}`}
            />
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between items-baseline'>
              <label htmlFor='password' className='text-base flex gap-1'>
                Password {getErrorIndicator(errors.password)}
              </label>
              {onForgotPassword && (
                <button type='button' className='text-sm hover:underline' onClick={() => onForgotPassword()}>
                  Forgot password?
                </button>
              )}
            </div>
            <input
              {...register('password')}
              type='password'
              id='password'
              aria-invalid={errors.password ? 'true' : 'false'}
              placeholder='*****'
              className={`w-full box-border border rounded-md ' ${getInputErrorClass(
                errors.password
              )}`}
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
          ) : mode === 'signIn' ? (
            'Sign in'
          ) : (
            'Sign up'
          )}
        </button>

        {getErrorText()}
      </form>
    );
  }
);

SignInForm.displayName = 'SignInForm';

export default SignInForm;
