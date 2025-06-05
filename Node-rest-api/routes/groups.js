const express = require("express");
const Group = require("../models/groupModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

// Join a group by userId
router.post("/:groupId/join", async (req, res) => {
  try {
    const { userId } = req.body;
    const { groupId } = req.params;

    if (!userId) return res.status(400).json({ error: "userId is required" });

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    // Avoid duplicates
    if (!group.joinees.includes(userId)) {
      group.joinees.push(userId);
      await group.save();
    }
    res.status(200).json({ message: "Successfully joined group", group });
  } catch (err) {
    console.error("Join group error:", err);
    res.status(500).json({ error: "Failed to join group" });
  }
});

// Create a new group
router.post("/", async (req, res) => {
  try {
    const { title, description, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Title and type are required" });
    }

    const newGroup = new Group({ title, description, type });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(500).json({ error: "Failed to create group" });
  }
});

module.exports = router;
