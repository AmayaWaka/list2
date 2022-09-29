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
mongoose.connect("mongodb://localhost:27017/todolistDB");
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
const item1 = new Item({
  name: "Wake"
});
const item2 = new Item({
  name: "Eat"
});
const item3 = new Item({
  name: "Run"
});
//a dummy array
const defaultItems =[item1, item2, item3];
//Schema for the dynamic route
const listSchema = {
  name: String,
  items: [itemsSchema]

};
//Dynamic route model
const List = mongoose.model("List", listSchema);

app.set('view engine', 'ejs');
app.get("/", function(req, res){
//Finding items from db
  Item.find({}, function(err, foundItems){
    if (foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err)
        }else{
          console.log("Successfuly saved default items to db");
        }
      });
      //Redirecting after a successful inserion
      res.redirect("/");
      //Once redirected the condition will fall under else statement since the array length is nolonger 0

    }else{
      res.render("list", { listTitle: "Today", newListItems: foundItems })
    }
  });
});
//Getting  custom todo list
app.get("/:customListName", function(req,res){
  const customListName = req.params.customListName;
  //Checking if the customListName exists
List.findOne({name: customListName}, function(err, foundList){
  if(!err){
    if(!foundList){
      console.log("Doesnt Exist");
    }else{
      console.log("Exists");
    }
  }

});
  const list = new List({
    name: customListName,
    items: defaultItems
  });

list.save();

});
//Saving dynamic data to db
app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });
  item.save();

  res.redirect("/");

});

app.get("/work", function(req, res){
  res.render("list", { listTitle: "Work List", newListItems: workItems })
});
app.post("/work", function(req, res){

  let item = req.body.newItem;

  workItems.push(item);
  res.redirect("/work");

});

app.post("/delete",function(req, res){
  const checkedItemId = req.body.checkbox;

//finding and Deleting items from db
  Item.findByIdAndRemove(checkedItemId, function(err){
if(!err){
  console.log("Successfuly deleted checked item");
  res.redirect("/");
}

  });

});

app.listen(3000, function(req, res){
  console.log("Server Started on Port 3000")
});
