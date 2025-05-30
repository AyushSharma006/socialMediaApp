import React from 'react'
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import SlideBar from '../components/SlideBar';

export default function MainLayout() {
  return (
    <div>
        <Topbar />
        <SlideBar />
        <Outlet />
    </div>
  )
}

