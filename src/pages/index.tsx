import type { GetServerSideProps, GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import sanityClient, { ClientConfig } from '@sanity/client';
import { Video } from '../../types';

import Head from 'next/head';
import type { NextPageWithAuth } from './_app';
import axios from 'axios';
import VideoCard from '../components/content/VideoCard';
import NoResults from '../components/content/NoResults';
import { ParsedUrlQuery } from 'querystring';

interface IProps {
  videos: Video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <title>Homepage</title>
      </Head>
      <main className='flex flex-col gap-10 videos h-full'>
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard key={video._id} post={video} isShowingOnHome={true} />
          ))
        ) : (
          <NoResults text={'No videos...'} />
        )}
      </main>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  topic: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { topic } = context.query as IParams;
  let res;
  if (topic) {
    res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`);
  } else {
    res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/post');
  }
  return {
    props: { videos: res.data },
  };
};

export default Home;
