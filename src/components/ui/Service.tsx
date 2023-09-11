import React from 'react';

type Props = {
  title: string;
  children?: React.ReactNode;
};

const Service: React.FC<Props> = ({ title, children }) => {
  return (
    <div className='card card-compact bg-base-100 w-full shadow-md min-w-[180px]'>
      <div className='card-body'>
        <h2 className='card-title'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 fill-teal-400'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z'
              clipRule='evenodd'
            />
          </svg>
          {title}
        </h2>
        <div className='h-[1px] w-96 my-0 bg-gradient-to-r from-blue-500 to-white opacity-50'></div>
        {children}
      </div>
    </div>
  );
};

export default Service;
