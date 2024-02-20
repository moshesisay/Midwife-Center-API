const Chat = require("../models/Chat");
const { 
    verifyToken,
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin, 
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newChat = new Chat(req.body);
  
    try {
      const savedChat = await newChat.save();
      res.status(200).json(savedChat);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// UPDATE Chat
router.put("/:id", verifyToken, async (req, res) => {
    try {
      const updatedChat = await Chat.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedChat);
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE Chat
router.delete("/:id", verifyToken, async (req, res) => {
    try {
      await Chat.findByIdAndDelete(req.params.id);
      res.status(200).json("Chat has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
});

// READ Chat by ID
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const chat = await Chat.findById(req.params.id)
        .populate("patient", "username email") // Populate patient with selected fields
        .populate("doctor", "username email"); // Populate doctor with selected fields
  
      if (!chat) {
        return res.status(404).json("Chat not found");
      }
  
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
});
/*
// READ All Chats
router.get("/", verifyToken, async (req, res) => {
    try {
      const chats = await Chat.find()
        .populate("patient", "username email") // Populate patient with selected fields
        .populate("doctor", "username email"); // Populate doctor with selected fields
      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json(err);
    }
});
*/



module.exports = router