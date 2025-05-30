const router = require("express").Router();
const ConversationModel = require("../models/conversationModel");

// create new conversation -> first time chat
router.post('/', async (req, res) => {
    const newConversation = new ConversationModel({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get conversation -> get the messages if chat already exists
router.get('/:userId', async (req, res) => {
    try {
        const conversation = await ConversationModel.find({
            members: {$in : [req.params.userId]}
        })
        res.status(200).json(conversation);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

