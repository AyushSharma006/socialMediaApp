import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8000");

export default function GroupChat({ group, currentUserId, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/messages/group/${group._id}`)
      .then((res) => setMessages(res.data || []))
      .catch((err) => console.error("Failed to load messages", err));

    console.log(currentUserId);
  }, [group]);

  useEffect(() => {
    socket.emit("joinGroup", group._id);

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [group._id]);

  const handleSend = () => {
    if (!input.trim()) return;

    socket.emit("groupMessage", {
      groupId: group._id,
      userId: currentUserId,
      text: input,
    });

    setInput("");
  };

  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        &larr; Back to groups
      </button>
      <h2 className="text-2xl font-bold mb-4">{group.title} Chat</h2>

      <div className="border rounded-lg h-[400px] p-4 bg-gray-50 overflow-y-scroll">
        {messages.length === 0 ? (
          <p className="text-gray-500 italic">No messages yet</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={msg._id || idx}
              className={`mb-3 p-2 rounded ${
                msg.sender === currentUserId
                  ? "bg-blue-100 text-right ml-auto max-w-xs"
                  : "bg-white text-left mr-auto max-w-xs"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs text-gray-500">
                {msg.sender === currentUserId ? "You" : "User"}
              </p>
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 border rounded-l px-3 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
