const fs = require('fs');
const express = require("express");

const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"));

app.get("/",function(req,res){
    
    res.render('list',{listTitle: "TODO", newListItems: JSON.parse(fs.readFileSync("test.db"))});
    // list --> list.ejs

});

app.post("/",function(req,res){
    let item = req.body.newItem;
    let items = JSON.parse(fs.readFileSync("test.db"));
    items.push(item);
    fs.writeFile("test.db", JSON.stringify(items), (err) => {});
    res.redirect("/");
});


//*********************
app.listen(process.env.PORT || 3000, function(){
    console.log("Server Live Here: http://localhost:3000/");
});
