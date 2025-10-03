const Todo = require('../models/Todo');

// CREATE Todo (belongs to logged-in user)
const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({ 
      ...req.body, 
      userId: req.user.id   // attach userId from JWT
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all Todos of logged-in user
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Todo (only if owned by logged-in user)
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // check ownership
    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this todo' });
    }

    await todo.deleteOne();
    res.status(200).json({ message: 'Todo deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Todo (only if owned by logged-in user)
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // check ownership
    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this todo' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

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
