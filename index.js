const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//Mongoose variable declared
const mongoose = require("mongoose");



// const items = [];
// const workItems = [];
//List.ejs rendering
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
//Connect and create db using mongoose
mongoose.connect("mongodb://localhost:27017/todolistDB")
//Items schema created
// const itemsSchema = mongoose.Schema({
//   name: String
// });
//Items schema second way
const itemsSchema = {
  name: String
};
//Item model used to create the item collection
const Item = mongoose.model("item",itemsSchema );


//New Items
const item1 = new Item({
name: "Wake up"
});

const item2 = new Item({
name: "Take a bath"
});

const item3 = new Item({
name: "Eat"
});

//a dummy array

const defaultItems =[item1, item2, item3];
// Item.insertMany(defaultItems, function(err){
//   if(err){
//     console.log(err)
//   }else{
//     console.log("Successfully saved dummy items");
//   }
// })





app.set('view engine', 'ejs');
app.get("/", function(req, res){

  Item.find({}, function(err, foundItems){
    res.render("list", { listTitle: "Today", newListItems: foundItems })


  });
});

app.post("/", function(req, res){

  item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work")
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", { listTitle: "Work List", newListItems: workItems })
});
app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");

});

app.listen(3000, function(req, res){
  console.log("Server Started on Port 3000")
});
