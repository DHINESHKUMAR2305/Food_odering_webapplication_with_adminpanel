const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: String,

  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],

  orderType: String,
  total: Number,

  form: {
    name: String,
    phone: String,
    address: String,
    tableNo: String
  },

  date: String
});

module.exports = mongoose.model("Order", orderSchema);