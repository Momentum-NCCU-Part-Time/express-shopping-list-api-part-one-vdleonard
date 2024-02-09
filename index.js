require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")

const port = process.env.PORT

// Daatbase connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.once("open", () => console.log(" :3 Connected to MongoDB"))
const app = express()
app.use(morgan("dev"))
app.use(express.json())
const ShoppingLists = require("./models/Shoppinglists")

//Read all :: GET

app.get("/shoppinglists", (req, res) => {
  //  Ask database for shoppinglists
  ShoppingLists.find().then(results => res.status(200).json(results))
})

//Read Spesific :: GET
app.get("/shoppinglists/:shoppinglistsId", (req, res) => {
  // look up the specific bookmark that is being requested in the url, using the model
  ShoppingLists.findById(req.params.shoppinglistsId)
    .then(results => {
      if (results) {
        res.status(200).json(results)
      } else {
        res.status(404).json({ message: "not found" })
      }
    })
    .catch(error => res.status(400).json({ message: "Bad request" }))
})

//Create :: POST
app.post("/shoppinglists", (req, res) => {
  const newShoppingList = new ShoppingLists(req.body) // Make new lists
  newShoppingList.save() // save it to the database
  res.status(201).json(newShoppingList) // Return new list
})

//Update :: PATCH

app.patch("/shoppinglists/:shoppinglistsId", (req, res) => {
  //Find shopping list
  ShoppingLists.findById(req.params.shoppinglistId)
    .then(shoppinglists => {
      if (shoppinglists) {
        shoppinglists.title = req.body.title || shoppinglists.title
        bookmark.url = req.body.url || shoppinglists.url
        // save
        shoppinglists.save()
        res.status(200).json(shoppinglists)
      } else {
        res.status(404).json({ message: "not found" })
      }
    })
    .catch(error => res.status(400).json({ message: "Bad request" }))
})

//Remove :: DELETE

app.delete("/bookmarks/:bookmarkId", (req, res) => {
  // use findbyid check if it exsits
  // if it esits use removebyid to remove it
  //use .save to save?
  //if it does not exsits return 404 not found
  //Add error catch?
})
