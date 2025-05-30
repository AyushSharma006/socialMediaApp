import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Post({post}) {
  const [likeCounter, setlikeCounter] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      // users' liked posts
      const res = await axios.get(`http://localhost:8000/api/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId])

  const handleLikeCounter = () => {
    try{
      // likes the post with postId = post._id and adds user to its liked array with userId = currentUser._id
      axios.put(`http://localhost:8000/api/posts/${post._id}/like`, {userId: currentUser._id});
    } catch(error) {
      console.log(error);
    }
    if (liked) {
      setlikeCounter(likeCounter - 1);
      setLiked(false);
    } else {
      setlikeCounter(likeCounter + 1);
      setLiked(true);
    }
  };

  return (
    <div className="my-4 flex flex-col p-4 shadow-lg min-w-[37rem]">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row items-center gap-3">
          <img
            className="h-[55px] w-[55px] object-cover rounded-full border-2 border-white"
            src={user.profilepicture || '/assists/photo1.jpg'}
            alt=""
          />
          <h1 className="text-base font-semibold">{user.username}</h1>
          <div className="text-sm font-normal ml-3">9 Nov 2024</div>
        </div>
        <div className="text-xl">
          <BsThreeDotsVertical />
        </div>
      </div>
      <p className="text-xl font-normal mt-3 max-w-[37rem]">
        {post.desc}
      </p>
      {post.img ? <div className="flex justify-center w-full bg-black mt-3">
        <img
          className="w-full h-[450px] object-contain"
          src={`http://localhost:8000/images/1745929081409_1359301.png`}
          alt=""
        />
      </div> : null}
      <div className="flex flex-row gap-2 text-2xl items-center mt-3">
        <FcLike className="cursor-pointer" onClick={handleLikeCounter} />
        <span className="text-base font-medium">{likeCounter}</span>
      </div>
    </div>
  );
}

export default Post;

