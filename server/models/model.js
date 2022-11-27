// const Schema = require('mongoose').Schema; // define the mongoose variable and write like the follows:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// I: categories => field => ['type', 'color']
const categories_model = new Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "#FCBE44" },
});

// II: transactions  => field => ['name', 'type', 'amount', 'date']
const transaction_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "Investment" },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

// Add these models to database
const Categories = mongoose.model("categories", categories_model);
const Transaction = mongoose.model("transaction", transaction_model);

exports.default = Transaction;
module.exports = {
  Categories,
  Transaction,
};
