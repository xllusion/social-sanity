import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth-context';
import { EmailForm } from '../../components';
import Link from 'next/link';
import type { NextPageWithAuth } from '../_app';

const ForgotPassword: NextPageWithAuth = () => {
  const { formStatus, sendPasswordResetEmailFB, resetErrorStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (formStatus === 'error') {
      const timer = setTimeout(() => {
        resetErrorStatus();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [resetErrorStatus, router, formStatus]);

  const submitHandler = (email: string) => {
    sendPasswordResetEmailFB(email);
  };

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <title>Forgot your password</title>
      </Head>
      {/* <video
        src='/assets/water.mp4'
        typeof='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='fixed w-screen h-screen object-cover'
      />
      <div className='fixed w-screen h-screen bg-black/20' /> */}

      {/* Fix Collapsing margins issue using overflow or flex/grid */}
      <div className='relative overflow-auto'>
        <section className='flex flex-col p-8 mx-auto sm:rounded-md sm:shadow sm:mt-12 bg-gray-50/80 w-full min-h-screen min-w-[280px] sm:w-fit sm:min-h-fit'>
          <h2 className='mb-3 text-3xl font-semibold text-center'>Forgot your password</h2>
          <p className='text-base text-center mb-4'>
            Have other account?{' '}
            <Link href={'/auth/signin'}>
              <a className='focus:underline hover:underline'>Sign in here</a>
            </Link>
          </p>

          <EmailForm
            formStatus={{
              submitting: formStatus === 'submitting',
              succeeded: formStatus === 'succeeded',
              error: formStatus === 'error',
            }}
            formStatusText={{
              succeeded: 'Reset password email sent',
              error: "Can't find the email ...",
            }}
            onSubmit={submitHandler}
          />
        </section>
      </div>
    </>
  );
};

ForgotPassword.auth = 'auth';

export default ForgotPassword;
