const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    title:String,
    description:String,
    //completed:boolean
},{timestamps:true});

module.exports=mongoose.model('Todo',todoSchema);
