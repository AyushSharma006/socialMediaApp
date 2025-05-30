const router = require("express").Router();
const Postm = require("../models/PostsModel");
const User = require("../models/userMode");

// creating new post
router.post("/", async (req, res) => {
  const newPost = new Postm(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the post" });
  }
});

// update the post
router.put("/:id", async (req, res) => {
  try {
    const post = await Postm.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.updateOne({$set : req.body});
        res.status(200).json("post updated");
    } else {
        console.log(req.params.id +" "+ post.userId);
        res.status(403).json("You can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete the post
router.delete("/:id", async (req, res) => {
    try {
      const post = await Postm.findById(req.params.id);
      if (post.userId === req.body.userId) {
          await post.deleteOne({$set : req.body});
          res.status(200).json("post deleted");
      } else {
          console.log(req.params.id +" "+ post.userId);
          res.status(403).json("You can delete only your post");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  // like a post || dislike a post
  // id -> post._id
  router.put("/:id/like", async (req, res) => {
    try {
        const post = await Postm.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$addToSet : {likes: req.body.userId}})
            res.status(200).json("the post has been liked")
            console.log(req.body.userId);
        } else {
            await post.updateOne({$pull : {likes : req.body.userId}})
            res.status(200).json("the post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error);
    }
  })

  // get a post
  router.get("/:id", async (req, res) => {
    try {
        const post = await Postm.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
  })

  // get timeline posts
  router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Postm.find({userId : currentUser._id});
        // run multiple databse queries in parallel
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => Postm.find({userId : friendId}))
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error);
    }
  })

  // get user's all posts
  router.get("/profile/:username", async(req, res) => {
    try {
      // find the user whose profile has been visited
        const user = await User.findOne({username : req.params.username});
        // fetch all the posts of 
        const posts = await Postm.find({userId : user._id});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
  })

module.exports = router;

