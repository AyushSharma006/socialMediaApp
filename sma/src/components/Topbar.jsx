import React, { useContext, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Topbar() {
  const user = useSelector((state) => state.user);

  return (
    <div className="h-[65px] w-full bg-blue-700 flex flex-row justify-around text-white z-[99] items-center fixed top-0">
      <div className="w-3/12 flex items-center font-bold text-xl cursor-pointer">
        Lernify
      </div>
      <div className="w-4/12 flex items-center text-black bg-white h-9 rounded-3xl">
        <IoSearchSharp className="ml-2 mr-1" />
        <input
          placeholder="Search"
          type="text"
          className="h-9 focus:outline-none rounded-full pr-3 pl-1 w-full"
        />
      </div>
      <div className="w-4/12 flex flex-row justify-around items-center">
        <div className="w-2/5 flex flex-row justify-around text-base font-semibold">
          <Link to={"/find"} className="cursor-pointer">Find</Link>
          <div className="cursor-pointer">TimeLine</div>
        </div>
        <div className="flex flex-row w-2/5 justify-evenly text-xl">
          <div className="cursor-pointer">
            <IoNotifications />
          </div>
          <div className="cursor-pointer">
            <IoPeople />
          </div>
          <div className="cursor-pointer">
            <TiMessages />
          </div>
        </div>
        <div className="text-3xl cursor-pointer">
          <Link to={user ? `/profile/${user.username}` : "/login"}>
            <CgProfile />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topbar;

