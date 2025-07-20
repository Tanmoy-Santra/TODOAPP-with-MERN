// // controllers/todoController.js

// const Todo = require('../models/Todo');

// // CREATE Todo
// const createTodo = async (req, res) => {
//   try {
//     const newTodo = new Todo(req.body);
//     const savedTodo = await newTodo.save();
//     res.status(201).json(savedTodo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET all Todos
// const getAllTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.status(200).json(todos);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //deleteTodo

// const deleteTodo=async(req,res)=>{
//   try {
//     const {id}=req.params;
//     const deletedTodo=await Todo.findByIdAndDelete(id);
//     if (!deletedTodo) {
//       return res.status(404).json({ message: 'Todo not found' });
//     }

//     res.status(200).json({ message: 'Todo deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// // UPDATE a Todo
// const updateTodo = async (req, res) => {
//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedTodo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createTodo,
//   getAllTodos,
//   deleteTodo,
//   updateTodo
// };

const Todo = require('../models/Todo');

// CREATE Todo
const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all Todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Todo
const updateTodo = async (req, res) => {
  try {
    const { completed } = req.body;

    // If completed is explicitly true, set completedAt
    if (completed === true) {
      req.body.completedAt = new Date();
    }

    // If completed is explicitly false, clear completedAt
    if (completed === false) {
      req.body.completedAt = null;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  deleteTodo,
  updateTodo
};
