import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Topbar from "./Topbar";
import Conversation from "./Conversation";
import Messages from "./Messages";
import { useNavigate } from "react-router-dom";

function Chat() {
  const user = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  if (!user || !user._id) {
    navigate("/login"); // assuming your login page is at /login
  }
}, [user, navigate]);


  useEffect(() => {
    const getConversations = async () => {
      if (user?._id) {
        try {
          const res = await axios.get(`http://localhost:8000/api/conversations/${user._id}`);
          setConversations(res.data);
        } catch (error) {
          console.error("Failed to fetch conversations:", error);
        }
      }
    };

    getConversations();
  }, [user]);

  const handleClick = async (conversation) => {
    setCurrentChat(conversation);
    try {
      const res = await axios.get(`http://localhost:8000/api/messages/${conversation._id}`);
      setMessages(res.data);
      console.log(res.data);
      console.log(conversation._id);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="flex flex-row mt-16 w-full">
        <div className="w-1/4 h-[calc(100vh-65px)] overflow-y-auto">
          {conversations.map((conversation, index) => (
            <div key={index} onClick={() => handleClick(conversation)} className="cursor-pointer">
              <Conversation currentUser={user} conversation={conversation} />
            </div>
          ))}
        </div>

        {currentChat ? (
          <Messages
            user={user}
            messages={messages}
            className="w-3/4 h-[calc(100vh-65px)]"
          />
        ) : (
          <div className="w-3/4 flex h-[calc(100vh-65px)] justify-center items-center text-4xl font-medium text-zinc-400">
            Open a chat to start messaging
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;

