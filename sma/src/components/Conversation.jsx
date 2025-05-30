import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users?userId=${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch friend data:", error);
      }
    };

    getUser();
  }, [conversation, currentUser]);

  return (
    <Card name={user?.username || "Loading..."} className="w-full" />
  );
}

export default Conversation;

