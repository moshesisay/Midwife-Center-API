const Article = require("../models/Article");
const { 
    verifyToken,
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin, 
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newArticle = new Article(req.body);
  
    try {
      const savedArticle = await newArticle.save();
      res.status(200).json(savedArticle);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json("Article has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ARTICLE
router.get("/find/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
//GET ALL ARTICLE
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

module.exports = router