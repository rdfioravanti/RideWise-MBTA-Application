const mongoose = require("mongoose");

//user schema/model
const ratingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      label: "username",
    },
    rating: {
      type: Number,
      required: false,
      label: "rating",
    },
    comment: {
      type: String,
      required: false,
      label: "comment"
    },
  },
  { collection: "ratings" }
);

module.exports = mongoose.model('ratings', ratingSchema)