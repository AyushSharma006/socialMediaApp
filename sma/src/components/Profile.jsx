import React from "react";
import Topbar from "./Topbar";
import SlideBar from "./SlideBar";
import Feed from "./Feed";
import RightBar from "./RightBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function Profile() {
  const currentUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const params = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const username = params.username; // let I visited  "testuser"

  const handleFollow = async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user._id) {
      if (currentUser.followings.includes(user._id)) {
        setIsFollowing(true);
      }
      console.log(currentUser);
      console.log(isFollowing);
    }
  }, [currentUser, user._id]);

  const Photo =
    "https://imgs.search.brave.com/lLieNxaI-AVw2AV19Se-wNZ6bwigBxSpwddX0X--uSQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zLnlp/bWcuY29tL255L2Fw/aS9yZXMvMS4yL0JB/N1NpX2JfNWVMeEhm/eWN4R1R1ZFEtLS9Z/WEJ3YVdROWFHbG5h/R3hoYm1SbGNqdDNQ/VGsyTUEtLS9odHRw/czovL21lZGlhLnpl/bmZzLmNvbS9lbi9i/dXp6ZmVlZF9hcnRp/Y2xlc183NzgvY2Fm/MTk4NDVmYjBjNDQ5/N2M5MzhlMDAxMWVk/MjA2YTA";

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?username=${username}`
      );
      setUser(res.data); // user = testuser
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar></Topbar>
      <SlideBar></SlideBar>
      <div className="h-[25rem] mt-[65px] ml-[20rem] w-[calc(100%-20rem)] px-5 py-3 relative">
        <div className="h-full relative w-full rounded-xl flex shadow-xl justify-center items-center flex-col gap-3">
          <div className="absolute h-[12.5rem] top-0 w-full z-[-1] bg-blue-700"></div>
          <div className="w-[200px] h-[200px] rounded-full bg-black flex justify-center items-center">
            <img
              className="object-cover w-full h-full rounded-full border-4 border-white"
              src={Photo || user.profilePicture}
              alt=""
            />
          </div>
          <h1 className="font-bold text-xl text-slate-800">{username}</h1>
          <div className="flex flex-row gap-5 items-center">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-lg font-medium">followers:</h1>
              <h1 className="text-lg font-medium">{user.followers?.length}</h1>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-lg font-medium">following:</h1>
              <h1 className="text-lg font-medium">{user.followings?.length}</h1>
            </div>
            {currentUser.username !== username &&
              (isFollowing ? (
                <button className="font-bold text-sm bg-blue-500 px-2 py-1 rounded-lg text-white">
                  Unfollow
                </button>
              ) : (
                <button onClick={handleFollow} className="font-bold text-sm bg-blue-500 px-2 py-1 rounded-lg text-white">
                  Follow
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-slate-300">
        <Feed className="left-[20rem] absolute" username={username}></Feed>
        {user && user._id && (
          <RightBar user={user} className="right-0 min-w-72 absolute" />
        )}
      </div>
    </>
  );
}

export default Profile;


/**
 *
 * https://imgs.search.brave.com/lLieNxaI-AVw2AV19Se-wNZ6bwigBxSpwddX0X--uSQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zLnlp/bWcuY29tL255L2Fw/aS9yZXMvMS4yL0JB/N1NpX2JfNWVMeEhm/eWN4R1R1ZFEtLS9Z/WEJ3YVdROWFHbG5h/R3hoYm1SbGNqdDNQ/VGsyTUEtLS9odHRw/czovL21lZGlhLnpl/bmZzLmNvbS9lbi9i/dXp6ZmVlZF9hcnRp/Y2xlc183NzgvY2Fm/MTk4NDVmYjBjNDQ5/N2M5MzhlMDAxMWVk/MjA2YTA
 */

