const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
module.exports = ChatMessage;
