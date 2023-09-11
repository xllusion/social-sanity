import type { NextPage } from 'next';
import Head from 'next/head';
import { Navbar, ContactForm } from '../components';
import type { NextPageWithAuth } from './_app';

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <title>Contact Us - Xllusion UK</title>
      </Head>
      
      <main>
        <div className='grid grid-cols-1 pt-8 md:pt-6 md:basis-1/2 w-full justify-items-center gap-4'>
          <ContactForm />
        </div>
      </main>
    </>
  );
};

//Contact.auth = 'user';

export default Contact;