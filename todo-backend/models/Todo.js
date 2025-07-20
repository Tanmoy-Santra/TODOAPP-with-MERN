// const mongoose=require('mongoose');

// const todoSchema=new mongoose.Schema({
//     title:String,
//     description:String,   
// },{timestamps:true});

// module.exports=mongoose.model('Todo',todoSchema);


const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model('Todo', todoSchema);
