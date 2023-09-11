import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useAuth } from '../../store/auth-context';
import { BiSearch, BiUpload } from 'react-icons/bi';

const SidebarWithCheckbox: React.FC<{ id: string; onOpen?: () => void; onClose?: () => void }> = ({
  id,
  onOpen,
  onClose,
}) => {
  const { authStatus, user, signOutFB, signInWithGoogleFB } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const inputCheckBoxRef = useRef<HTMLInputElement>(null);

  const closeHandler = (): void => {
    if (inputCheckBoxRef.current) {
      inputCheckBoxRef.current.checked = false;
      if (onClose) onClose();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.target.checked;
    if (checked && onOpen) onOpen();
    else if (!checked && onClose) onClose();
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div>
      <input
        id={id}
        ref={inputCheckBoxRef}
        onChange={changeHandler}
        type='checkbox'
        className='peer sr-only'
      />
      <nav className='absolute sm:hidden z-20 transition-all left-0 top-0 h-screen p-3 space-y-2 w-full bg-gray-200 text-gray-800 peer-checked:translate-x-0 -translate-x-full'>
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
                  className='text-xs hover:underline text-gray-600'
                >
                  View profile
                </a>
              </span>
            </div>
          </div>
        )}
        <div className='divide-y divide-gray-300'>
          <ul className='pt-2 pb-4 space-y-1 text-sm'>
            {authStatus !== 'authenticated' &&<li className='hover:bg-gray-100 block w-10 h-12'></li>}
            <li className='relative'>
              <form onSubmit={handleSearch} className=''>
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className='bg-primary p-3 font-medium border-2 border-gray-300 focus:outline-none focus:border-2 focus:border-gray-300 w-full rounded-full  md:top-0'
                  placeholder='Search videos'
                />
                <button
                  onClick={handleSearch}
                  className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
                >
                  <BiSearch />
                </button>
              </form>
            </li>
          </ul>
          <ul className='pt-4 pb-2 space-y-1 text-sm'>
            {authStatus !== 'loading' && (
              <li className='hover:bg-gray-100'>
                  <button
                    onClick={() => {
                      authStatus === 'authenticated' && user ? signOutFB() : signInWithGoogleFB();
                      closeHandler();
                    }}
                    className='self-center px-8 py-2 font-semibold rounded bg-blue-600 text-gray-50'
                  >
                    {authStatus === 'authenticated' && user ? 'Sign out' : 'Sign in'}
                  </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SidebarWithCheckbox;
