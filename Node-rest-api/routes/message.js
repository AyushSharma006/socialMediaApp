const router = require("express").Router();
const MessageModel = require("../models/messageModel");

const ChatMessage = require("../models/chatModel");

// add the messages
router.post("/", async (req, res) => {
  const newMessage = new MessageModel(req.body);
  try {
    const savedMessage = newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get the messages
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/group/:groupId", async (req, res) => {
  try {
    const messages = await ChatMessage.find({ group: req.params.groupId }).sort(
      { timestamp: 1 }
    ); // Oldest to newest
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
