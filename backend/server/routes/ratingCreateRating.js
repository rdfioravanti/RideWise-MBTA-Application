const express = require("express");
const router = express.Router();
const ratingModel = require('../models/RatingModel')

router.post('/add', async (req, res) => {
    const { username, rating, comment } = req.body

    // validate user input
    if (!username || !rating || !comment) {
        res.status(400).send({ message: "Username, rating, and comment are required." });
        return;
    }

    // check if rating is greater than 5
    if (rating > 5) {
        res.status(400).send({ message: "Rating should be less than or equal to 5." });
        return;
    }

    //creates a new rating
    const createRating = new ratingModel({
        username: username,
        rating: rating,
        comment: comment,
    });

    try {
        const saveRating = await createRating.save();
        res.send(saveRating);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new rating" });
    }
})


module.exports = router;
