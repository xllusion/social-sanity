import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../../store/auth-context';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { FaHome, FaSignOutAlt, FaTelegramPlane } from 'react-icons/fa';
import Discover from '../content/Discover';
import SuggestedAccounts from '../content/SuggestedAccounts';
import Footer from '../content/Footer';

const Sidebar: React.FC = () => {
  const { authStatus, user, signOutFB } = useAuth();
  const [isShow, setIsShow] = useState(true);
  const router = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuth();

  return (
    <nav className='block sm:w-60 w-full h-full p-2 space-y-2 bg-gray-200 text-gray-800'>
      {authStatus === 'authenticated' && user && (
        <div className='flex items-center p-2 space-x-4'>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt='User image'
              loading='lazy'
              referrerPolicy='no-referrer'
              className='w-12 h-12 rounded-full bg-gray-500'
            />
          ) : (
            <img
              src='/img/user.png'
              alt='User image'
              loading='lazy'
              referrerPolicy='no-referrer'
              className='w-12 h-12 rounded-full bg-gray-500'
            />
          )}
          <div>
            <h2 className='text-lg font-semibold'>
              {user.displayName ? user.displayName : user.email}
            </h2>
            <span className='flex items-center space-x-1'>
              <a
                rel='noopener noreferrer'
                href='#'
                className='text-xs hover:underline text-gray-600'>
                View profile
              </a>
            </span>
          </div>
        </div>
      )}
      <div className='divide-y divide-gray-300'>
        <ul className='pt-2 pb-4 space-y-1 text-sm'>
          <li className='hover:bg-gray-100'>
            <Link href='/'>
              <div className='flex items-center p-2 space-x-3 rounded-md'>
                <FaHome />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li className='hover:bg-gray-100'>
            <Link href='/contact'>
              <div className='flex items-center p-2 space-x-3 rounded-md'>
                <FaTelegramPlane />
                <span>Contact</span>
              </div>
            </Link>
          </li>
        </ul>
        <Discover />
        <SuggestedAccounts fetchAllUsers={fetchAllUsers} allUsers={allUsers} />
        <Footer />
{/* 
        <div className='flex justify-center'>
          {authStatus !== 'loading' && (
            <button
              onClick={() => {
                authStatus === 'authenticated' && user
                  ? signOutFB()
                  : router.replace('/auth/signin');
              }}
              className='flex items-center mt-4 py-2 px-4 gap-2 text-base font-semibold bg-teal-400 hover:bg-purple-400 rounded-md'>
              <FaSignOutAlt />
              <span>{authStatus === 'authenticated' && user ? 'Sign out' : 'Sign in'}</span>
            </button>
          )}
        </div> */}
      </div>
    </nav>
  );
};

export default Sidebar;
