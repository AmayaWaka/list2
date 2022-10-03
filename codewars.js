const express = require("express");
const app = express();



app.get("/", function(req,res){
  const defaultList =[2,2,3,5,2];


  function readList(){
    for(i=0; i<5; i++){
      var outputList = defaultList[i];
      // console.log(outputList);
      // console.log(i);

    }
  }
  readList();


  defaultList.forEach(function(defaultList){
    console.log("defaultList");

  });

});

app.listen("3000", function(req,res){
  console.log("Server Started on Port 3000");
});
