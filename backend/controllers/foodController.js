const Food = require("../models/Food");

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("restaurantId");
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFood = async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.json(newFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};