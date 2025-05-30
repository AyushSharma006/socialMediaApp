import React, { useEffect, useState} from "react";
import Topbar from "./Topbar";
import SlideBar from "./SlideBar";
import Feed from "./Feed";
import RightBar from "./RightBar";
import axios from "axios";

function Home() {
  
  return (
    <>
      <div className="relative flex flex-row h-screen">
        <Topbar />
        <SlideBar />
        <Feed className="absolute top-[65px] left-[20rem] flex-grow" />
      </div>
    </>
  );
}

export default Home;

