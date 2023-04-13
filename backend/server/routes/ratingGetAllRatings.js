const express = require("express");
const router = express.Router();
const ratingModel = require('../models/RatingModel')

router.get('/getAll', async (req, res) => {
    const ratings = await ratingModel.find();
    return res.json(ratings)
  })

  module.exports = router;