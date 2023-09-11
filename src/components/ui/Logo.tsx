import React from 'react';

const Logo: React.FC<{ title: string; filename: string }> = ({ title, filename }) => {
  return (
    <>
      <img
        src={`${process.env.BASE_PATH}/img/logo-${filename}.png`}
        alt={title}
        loading='lazy'
        className='w-full aspect-auto rounded-xl bg-gray-300'
      />
    </>
  );
};

export default Logo;
