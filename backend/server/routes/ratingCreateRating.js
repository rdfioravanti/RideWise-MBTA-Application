const express = require("express");
const router = express.Router();
const ratingModel = require('../models/RatingModel')

router.post('/add', async (req, res) => {
    const { username, rating, comment    } = req.body


    //creates a new user
    const createRating = new ratingModel({
        username: username,
        rating: rating,
        comment: comment,
    });

   
    try {
        const saveRating = await createRating.save();
        res.send(saveRating);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new user" });
    }

})

module.exports = router;