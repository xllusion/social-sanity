import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../store/auth-context';
import Link from 'next/link';
import type { NextPageWithAuth } from '../_app';

const VerifyEmail: NextPageWithAuth = () => {
  const { formStatus, sendEmailVerificationFB, resetErrorStatus, signOutFB } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (formStatus === 'error') {
      const timer = setTimeout(() => {
        resetErrorStatus();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [resetErrorStatus, router, formStatus]);

  const submitHandler = () => {
    sendEmailVerificationFB();
  };

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <title>Email verification</title>
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
          <h2 className='mb-3 text-3xl font-semibold text-center'>Email verification</h2>
          <p className='text-base text-center mb-4'>
            Have other account?{' '}
            <button className='focus:underline hover:underline' onClick={() => signOutFB()}>
              Sign in here
            </button>
          </p>
          <p className='text-base text-center mb-4'>Please check your email, thanks.</p>

          <button
            onClick={submitHandler}
            disabled={formStatus === 'submitting' || formStatus === 'succeeded'}
            className='px-8 py-3 font-semibold rounded-md bg-blue-600 disabled:bg-blue-500 text-gray-50'>
            {formStatus === 'error' && 'Error sending ...'}
            {formStatus === 'succeeded' && 'Email verification sent'}

            {formStatus === 'submitting' && (
              <div className='flex justify-center items-center gap-2'>
                <div className='w-4 h-4 border-2 border-dashed rounded-full animate-spin border-white' />
                Sending ...
              </div>
            )}

            {!formStatus && 'Verify email again?'}
          </button>
        </section>
      </div>
    </>
  );
};

VerifyEmail.auth = 'verifyEmail';

export default VerifyEmail;
