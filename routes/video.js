const Video = require("../models/Video");
const { 
    verifyToken,
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin, 
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newVideo = new Video(req.body);
  
    try {
      const savedVideo = await newVideo.save();
      res.status(200).json(savedVideo);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET Video
  router.get("/find/:id", async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  /*
  //GET ALL ARTICLE
  router.get("/", async (req, res) => {
    try {
      const video = await Video.find();
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  */
  


module.exports = router