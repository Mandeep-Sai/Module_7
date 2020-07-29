const express = require("express");
const q2m = require("query-to-mongo");
const reviewModel = require("./schema");

const router = express.Router();

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const query = q2m(req.query);
    //console.log(query);
    const reviews = await reviewModel
      .find()
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.options.sort);
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});

//GET project by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await reviewModel.find({ projectId: req.params.id });
    res.send(review);
  } catch (error) {
    console.log(error);
  }
});

//POST
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newReview = new reviewModel(req.body);
    await newReview.save();
    res.send(req.body);
  } catch (error) {
    //next(error);
    res.send(error.errors);
  }
});

//EDIT or PUT by ID
router.put("/:id", async (req, res) => {
  try {
    await reviewModel.findByIdAndUpdate(req.params.id, req.body);
    res.send("Edited Successfully");
  } catch (error) {
    console.log(error);
  }
});

//DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
