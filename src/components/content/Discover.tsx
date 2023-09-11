import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { topics } from '../../utils/constants';

const Discover = () => {
  const router = useRouter();
  const {topic} = router.query;

  const activeStyle = 'border-teal-500';

  return (
    <div className='py-6'>
      <p className='text-gray-500 font-semibold mb-3 ml-3 hidden xl:block'>Popular Topic</p>
      <div className='flex gap-3 flex-wrap'>
        {topics.map((item) => {
          return (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div
                className={`flex border-2 p-2 gap-2 items-center hover:bg-teal-100 hover:cursor-pointer bg-white rounded-lg ${
                  item.name === topic ? ' border-purple-400' : 'border-teal-400'
                }`}>
                <span className='font-bold text-sm'>{item.icon}</span>
                <span className='font-medium text-sm block capitalize'>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
