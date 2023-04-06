const mongoose = require("mongoose");

//user schema/model
const ratingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    rating: {
      type: Number,
      required: true,
      label: "rating",
    },
    comment: {
      type: String,
      required: true,
      label: "comment"
    },
  },
  { collection: "ratings" }
);

module.exports = mongoose.model('ratings', ratingSchema)