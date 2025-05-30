import React from 'react';
import Topbar from './Topbar';

function NewsSideBar({ handleClick }) {

    const array = ['Technology', 'Sports', 'Entertainment', 'Health', 'Business', 'World', 'Science'];

  return (
    <>
        <div className='w-1/4 h-full overflow-y-auto p-3 flex flex-col gap-2'>
            {array.map((item, index) => {
                return (
                    <div onClick={handleClick} key={index} className='rounded-2xl hover:bg-slate-100 flex justify-center items-center text-lg font-medium h-14 cursor-pointer'>
                        {item}
                    </div>
                )
            })}
        </div>
    </>
  )
}

export default NewsSideBar;

