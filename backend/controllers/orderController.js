const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { userEmail, items, orderType, total, form } = req.body;

    const newOrder = new Order({
      userEmail,
      items,
      orderType,
      total,
      form, 
      date: new Date().toLocaleString()
    });

    await newOrder.save();

    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};