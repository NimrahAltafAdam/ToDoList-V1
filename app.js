const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //It is bound to the modlules exported from date.js

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
  // let today = new Date();
  // let options = {
  //   weekday: 'long',
  //   day: 'numeric',
  //   month: 'long'
  // };
  //
  // let day = today.toLocaleDateString("en-US", options);

  const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items} ); //When we add list here express will go in the view folder and look for a file name list.ejs and pass a key value pair where key is the var name mentioned in the marker and the value will be passed from a var in app.js
});

app.post("/", function(req,res) {
  const item = req.body.newItem;

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/")  //WHEN THE USER ADDS A LIST ITEM THE POST REQ IS TRIGGERED AND NEWITEM IS RETREIVED AND REDIRECTED TOWARDS THE HOME ROUTE I.E. THE GET REQ
  }
});

app.get("/work", function(req,res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req,res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req,res) {
  res.render("about");
});

app.listen(3000, function(req,res) {
  console.log("Server started on part 3000")
});



// Use EJS Marker ti tell the server to replace the value with the current value
// if (currentDay === 6 || currentDay === 0) {
//   day = "Weekend";
// } else {
//   day = "Weekday";
// }

// WE WILL USE THE <% TAG TO IMPLEMENT CONTROL FLOW STATEMNTS LIKE IF..THEN..ELSE WHILE ETC. IN EJS OR HTML


// app.get("/", function(req,res) {
//   var today = new Date();
//   var currentDay = today.getDay();
//   var day = "";
//
//   switch (currentDay) {
//     case 0:
//       day = "Sunday"
//       break;
//     case 1:
//       day = "Monday"
//       break;
//     case 2:
//       day = "Tuesday"
//       break;
//     case 3:
//       day = "Wednesday"
//       break;
//     case 4:
//       day = "Thursday"
//       break;
//     case 5:
//       day = "Friday"
//       break;
//     case 6:
//       day = "Saturday"
//       break;
//     default:
//     console.log("Error: current day is equal to: " + currentDay);
//   }
//
//   res.render("list", {kindofDay: day} ); //When we add list here express will go in the view folder and look for a file name list.ejs and pass a key value pair where key is the var name mentioned in the marker and the value will be passed from a var in app.js
// });

//                 USE OF CONTROL FLOW STATEMENTS IN LIST.EJS

// <% if (kindofDay === "Saturday" || kindofDay === "Sunday") { %>
//   <h1 style = "color: purple" > <%= kindofDay %> ToDo List </h1>
// <% } else { %>
//   <h1 style = "color: blue"> <%= kindofDay %> ToDo List </h1>
// <% } %>
