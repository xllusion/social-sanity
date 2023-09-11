import React from 'react';

type Props = {
  title: string;
  quote: string;
  name: string;
  job: string;
}

const Testimonial: React.FC<Props> = ({title, quote, name, job}) => {
  return (
    <div className='w-auto'>
      <div className='relative w-auto min-w-[180px] shadow-sm border rounded-lg bg-stone-50'>
        <div className='card card-compact'>
          <div className='card-body'>
            <h2 className='card-title font-sans text-gray-600'>{title}</h2>
            <div className='h-3 text-3xl text-left text-gray-200'>“</div>
            <blockquote
              cite='https://www.linkedin.com/in/edliang/'
              className='px-4 font-sans text-gray-500 italic'>
              {quote}
            </blockquote>
            <div className='h-3 text-3xl text-right text-gray-200'>”</div>
          </div>
        </div>
        <div className='absolute -bottom-6 left-1/2 translate-x-[-50%] z-auto'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 fill-white'
            viewBox='0 0 24 24'
            fill='currentColor'>
            <polygon points='0,0 24,0 12,16 0,0' />
            <line
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              stroke='#eeeeee'
              x1='0'
              y1='0'
              x2='12'
              y2='16'
            />
            <line
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              stroke='#eeeeee'
              x1='12'
              y1='16'
              x2='24'
              y2='0'
            />
          </svg>
        </div>
      </div>

      <div className='text-center mt-6'>
        <h3 className='font-semibold text-gray-600'>{name}</h3>
        <p className=' text-sm text-gray-300'>{job}</p>
      </div>
    </div>
  );
};

export default Testimonial;
