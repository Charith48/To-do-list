const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.set("view engine","ejs");
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const todoSchema=new mongoose.Schema({
    name:String
});
const item=mongoose.model("task",todoSchema);

app.get("/",function(req,res){
    item.find({},function(err,foundItem){
        if(err){
            console.log(err);
        }else{
            res.render("list",{ejes:foundItem});
        }
    })
});
app.post("/",function(req,res){
    const todotasks=req.body.tskadder;
    const todo=new item({
        name:todotasks
    });
    todo.save();
    res.redirect("/");
});
app.post("/delete",function(req,res){
    const checked=req.body.checkbox1;
    item.findByIdAndRemove(checked,function(err){
        if(!err){
            console.log("Deleted record");
            res.redirect("/");
        }
    });

});
app.listen("3000",function(){
    console.log("Server started");
});