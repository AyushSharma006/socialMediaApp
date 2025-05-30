import React, { useState } from "react";
import Card from "./Card";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RightBar({ className, user }) {

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends =  async () => {
      const friendsList = await axios.get(`http://localhost:8000/api/users/friends/${user._id}`);
      setFriends(friendsList.data);
    }
    getFriends();

  }, [user._id])
  
  console.log(friends);

  return (
    <div className={className}>
      <div className=" flex flex-col py-5 px-5">
        <div className="flex flex-row items-center gap-3">
          <p className="text-base font-medium">Friends</p>
          <div className="h-[10px] w-[10px] rounded-full bg-green-500"></div>
        </div>
        {friends.map((friend, index) => {
          return <div key={index} className="mt-4" >
          {
            friend ? <Link to={`/profile/${friend.username}`}><Card name={friend.username}></Card></Link> : ""
          }
        </div>
        })}
      </div>
    </div>
  );
}

export default RightBar;

