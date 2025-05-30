import React from "react";
import Topbar from "./Topbar";
import { useState } from "react";
import axios from "axios";
import SlideBar from "./SlideBar";
import { Link } from "react-router-dom";

function Find() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
    const Photo =
    "https://imgs.search.brave.com/lLieNxaI-AVw2AV19Se-wNZ6bwigBxSpwddX0X--uSQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zLnlp/bWcuY29tL255L2Fw/aS9yZXMvMS4yL0JB/N1NpX2JfNWVMeEhm/eWN4R1R1ZFEtLS9Z/WEJ3YVdROWFHbG5h/R3hoYm1SbGNqdDNQ/VGsyTUEtLS9odHRw/czovL21lZGlhLnpl/bmZzLmNvbS9lbi9i/dXp6ZmVlZF9hcnRp/Y2xlc183NzgvY2Fm/MTk4NDVmYjBjNDQ5/N2M5MzhlMDAxMWVk/MjA2YTA";

  const handleSearch = (e) => {
    setUserId(e.target.value);
  };

  const handleClick = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/users?userId=${userId}`
      );
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Topbar />
      <SlideBar></SlideBar>
      <div className="w-full h-[calc(100vh-65px)] flex justify-center items-center mt-16">
        <div className="w-[35rem] h-80 flex gap-16 flex-col justify-center items-center">
          <div className="flex gap-3 items-center">
            <input
              value={userId}
              onChange={handleSearch}
              type="text"
              placeholder="write unique Id"
              className="w-[20rem] outline-none border-b-2 border-black h-fit py-1"
            />
            <button
              onClick={() => handleClick()}
              className="h-fit bg-blue-600 text-white hover:bg-blue-500 rounded-[7px] px-4 py-1 font-medium"
            >
              find
            </button>
          </div>
          {user ? (
            <div className="w-72 h-32 shadow-2xl bg-stone-100 rounded-2xl flex gap-5 justify-center items-center">
              <img src={Photo || user.profilePicture} className="h-20 object-cover w-20 rounded-full" alt="" />
              <div className="flex flex-col gap-3 items-center">
                <h1 className="font-medium text-xl">{user.username}</h1>
                <Link to={`/profile/${user.username}`} className=" hover:bg-blue-600 hover:text-white text-blue-700 border border-slate-400 px-3 py-1 rounded-lg w-fit font-semibold">visit </Link>
              </div>
            </div>
          ) : (
            <h1 className="font-medium text-xl text-neutral-400">
              No user with this ID
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Find;

