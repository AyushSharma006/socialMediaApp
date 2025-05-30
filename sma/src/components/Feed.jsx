import React, { useContext, useEffect, useState } from "react";
import Share from "./Share";
import Post from "./Post";
import axios from "axios";
import { useSelector } from "react-redux";

function Feed({ className, username }) { // username = testuser

  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user); // logged in user -> ayushsharma

  useEffect(() => {
    if (user) {
      const fetchPosts = async () => {
        try {
          const res = username // if we visited profile tab show its own post else timeline
            ? await axios.get(`http://localhost:8000/api/posts/profile/${username}`)
            : await axios.get(`http://localhost:8000/api/posts/timeline/${user._id}`);
          setPosts(res.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
    }
  }, [username, user._id]);

  return (
    <div className={className}>
      <div className="p-5">
        {(!username || username === user.username) && <Share></Share>}
        {posts ? posts.map((post) => (
          <Post key={post._id} post={post}></Post>
        )) : " "}
      </div>
    </div>
  );
}

export default Feed;

