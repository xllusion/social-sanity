import React, { useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps, NextPage } from 'next';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/content/VideoCard';
import NoResults from '../../components/content/NoResults';
import { IUser, Video } from '../../../types';
import { useAuth } from '../../store/auth-context';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  videos: Video[];
}

const Search: NextPage<IProps> = ({ videos }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: IUser[] } = useAuth();

  const router = useRouter();
  const { id }: any = router.query;

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(id)
  );
  return (
    <div className='w-full  '>
      <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
          onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className='md:mt-16'>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className='rounded-full'
                      alt='user-profile'
                      src={user.image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                        {user.userName} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize text-gray-400 text-sm'>{user.userName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${id}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
          {videos.length ? (
            videos.map((post: Video, idx: number) => <VideoCard post={post} key={idx} />)
          ) : (
            <NoResults text={`No Video Results for ${id}`} />
          )}
        </div>
      )}
    </div>
  );
};


interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${id}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
