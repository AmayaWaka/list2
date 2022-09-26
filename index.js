const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const items = [];
const workItems = [];
//List.ejs rendering
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.get("/", function(req, res){
  const day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items })
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
