import React, { useRef, useState } from "react";
import { IoMdPhotos } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";

function Share() {
  const desc = useRef();
  const currentUser = useSelector((state) => state.user);
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value,
    };
  
    if (file) {
      const data = new FormData();
      data.append("file", file);
      try {
        // Upload image
        const uploadRes = await axios.post("http://localhost:8000/api/uploads", data);
        newPost.img = uploadRes.data; // Save returned filename
      } catch (err) {
        console.log("Upload error:", err);
      }
    }
  
    try {
      await axios.post("http://localhost:8000/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log("Post creation error:", err);
    }
  };

  return (
    <div className="flex flex-col p-5 shadow-lg">
      <div className="flex flex-row w-full gap-4 items-end p-2">
        <div className="">
          <img
            className="h-[65px] w-[65px] object-cover rounded-full border-2 border-white"
            src="https://imgs.search.brave.com/lLieNxaI-AVw2AV19Se-wNZ6bwigBxSpwddX0X--uSQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zLnlp/bWcuY29tL255L2Fw/aS9yZXMvMS4yL0JB/N1NpX2JfNWVMeEhm/eWN4R1R1ZFEtLS9Z/WEJ3YVdROWFHbG5h/R3hoYm1SbGNqdDNQ/VGsyTUEtLS9odHRw/czovL21lZGlhLnpl/bmZzLmNvbS9lbi9i/dXp6ZmVlZF9hcnRp/Y2xlc183NzgvY2Fm/MTk4NDVmYjBjNDQ5/N2M5MzhlMDAxMWVk/MjA2YTA"
            alt=""
          />
        </div>
        <div className="border-b-2 border-gray-400">
          <input
            className="bg-transparent text-xl w-[30rem] focus:outline-none"
            placeholder={`What's in your mind ${currentUser.username}?`}
            ref={desc}
            type="text"
          />
        </div>
      </div>
      <br />
      <hr className="dark:bg-gray-200 h-[2px]" />
      <form action="" onSubmit={handleSubmit}>
        <label
          htmlFor="file"
          className="flex flex-row gap-4 justify-around mt-5"
        >
          <div className="flex flex-row items-center gap-2 text-sm font-semibold">
            {" "}
            <span className="text-xl cursor-pointer">
              <IoMdPhotos />
            </span>
            Photos and Videos
          </div>
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            className="hidden"
            id="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <button
            type="submit"
            className="font-semibold text-sm bg-blue-500 px-2 py-1 rounded-lg text-white"
          >
            Share
          </button>
        </label>
      </form>
    </div>
  );
}

export default Share;

