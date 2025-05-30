import React from 'react'
import { SlFeed } from "react-icons/sl";
import { MdGroups } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoBookmarks } from "react-icons/io5";
import { MdOutlineRssFeed } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function SlideBar() {
  return (
    <div className='w-[20rem] h-[calc(100vh-65px)] top-[65px] fixed'>
        <div className='p-5'>
            <ul className='flex flex-col gap-2'>
                <Link to={"/"} className='flex flex-row gap-3 items-center font-extrabold cursor-pointer hover:bg-slate-50 p-2 rounded-lg'><MdOutlineRssFeed  className='text-xl'/> <span className='font-semibold text-base'>Feed</span></Link>
                <Link to={"/chat"} className='flex flex-row gap-3 items-center font-extrabold cursor-pointer hover:bg-slate-50 p-2 rounded-lg'><IoChatboxEllipsesOutline className='text-xl'/><span className='font-semibold text-base'>Chat</span></Link>
                <li className='flex flex-row gap-3 items-center font-extrabold cursor-pointer hover:bg-slate-50 p-2 rounded-lg'><MdGroups className='text-xl'/><span className='font-semibold text-base'>Groups</span></li>
                <li className='flex flex-row gap-3 items-center font-extrabold cursor-pointer hover:bg-slate-50 p-2 rounded-lg'><IoBookmarks className='text-xl'/><span className='font-semibold text-base'>Bookmarks</span></li>
                <Link to={'/news'} className='flex flex-row gap-3 items-center font-extrabold cursor-pointer hover:bg-slate-50 p-2 rounded-lg'><FaRegNewspaper className='text-xl'/><span className='font-semibold text-base'>News</span></Link>
            </ul>
        </div>
    </div>
  )
}

export default SlideBar

