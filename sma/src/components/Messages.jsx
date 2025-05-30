import React from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

function Messages({ messages, className, user }) {
  return (
    <div className={`${className} relative bg-blue-100`}>
      <div className="w-full h-4/5 px-4 py-2 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-xl rounded-xl flex ${msg.sender === user._id ? "justify-end" : "justify-start"} items-center font-medium mb-4`}
          >
            <p className="text-left bg-blue-600 text-white px-3 py-2 rounded-xl max-w-[45rem]">
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute w-full h-1/5 bottom-0 p-5 flex justify-center items-center gap-3">
        <input
          placeholder="Write Something..."
          type="text"
          className="w-[50rem] rounded-2xl outline-none h-10 px-3 border border-black"
        />
        <IoSend className="text-2xl hover:cursor-pointer" />
      </div>
    </div>
  );
}

export default Messages;

