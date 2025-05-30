import React from 'react'

function Card({name}) {
  return (
    <div>
        <div className='flex flex-row items-center py-2 bg-slate-100 px-2 w-full rounded-lg hover:cursor-pointer'>
            <img className='w-[55px] h-[55px] rounded-full border border-2-white' src="https://imgs.search.brave.com/sGix1yOapXi7LmXuhv5wakm688EkRpVTmmbi1orFSXk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGVsbG9tYWdh/emluZS5jb20vaG9y/aXpvbi9zcXVhcmUv/NzkzZmRhZjU2ZTBh/LWFuYS1kZS1hcm1h/cy1yZWxhdGlvbnNo/aXAtdC5qcGc" alt="" />
            <h1 className='px-3 text-lg font-medium'>{name}</h1>
        </div>
    </div>
  )
}

export default Card

