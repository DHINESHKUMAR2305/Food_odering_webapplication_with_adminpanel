
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String
});

module.exports = mongoose.model("Restaurant", restaurantSchema);