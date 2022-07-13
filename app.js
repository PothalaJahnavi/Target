const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const res = require("express/lib/response");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect("mongodb+srv://me:me123456@cluster0.iczcone.mongodb.net/todolistDB");
// for creating schema for database
const itemsSchema={
    name:String
};
// creating a model for our schema
const Item=mongoose.model("Item",itemsSchema);
const item1=new Item({
    name:"add new targets"
});
const item2=new Item({
   name:"click + to insert into list"
});
const item3=new Item({
   name:"click delete button to remove from list"
});
const defArray=[item1,item2,item3];

app.get("/",(req,res)=>{
    var myday=new Date();
   var parts={
       weekday:"long",
       day:"numeric",
       month:"long"
   };

var day=myday.toLocaleDateString("en-US",parts);

Item.find({},(err,resArr)=>{
   if(resArr.length===0)
  {
    Item.insertMany(defArray,(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("successfully inserted");
        }
    });
    res.redirect("/");
  }
  else{
    res.render("list",{newDay:day,newtarget:resArr});
  }
});

});
app.post("/delete",(req,res)=>{
  const id=req.body.check;
  Item.findByIdAndRemove(id,(err)=>{
    if(!err)
    {console.log("deleted succefully");}
  });
  res.redirect("/");
});

app.post("/",(req,res)=>{
    const myitem=req.body.newitem;
     const item=new Item({
      name:myitem
     });
      item.save();
    res.redirect("/");
});
app.listen( process.env.PORT || 3000,(req,res) =>{
   console.log("server is running in port 3000");
});


//admin    9crrdibKnVAYBCFP
//mongosh "mongodb+srv://cluster0.iczcone.mongodb.net/myFirstDatabase" --apiVersion 1 --username admin
//mongodb+srv://admin:<password>@cluster0.iczcone.mongodb.net/?retryWrites=true&w=majority
