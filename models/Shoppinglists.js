const mongoose = require("mongoose")

const shoppingListSchema = new mongoose.Schema({
  title: { type: String, max: 50, required: true },
  createdAt: { type: Date, required: true }, /// Mongoose can do the times it's self
  updatedAt: { type: Date }
})

module.exports = mongoose.model("ShoppingList", shoppingListSchema)
