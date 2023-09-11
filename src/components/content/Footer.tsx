import React from 'react';

import { footerList1, footerList2, footerList3 } from '../../utils/constants';

const List: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className='flex flex-wrap gap-2 mt-5'>
      {items.map((item) => {
        return (
          <p key={item} className=' text-gray-500 text-sm hover:underline cursor-pointer'>
            {item}
          </p>
        );
      })}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div className='mt-6 xl:block'>
      <List items={footerList1} />
      <List items={footerList3} />
      <p className='text-sm text-gray-500 mt-5'>2022 V-Social</p>
    </div>
  );
};

export default Footer;
