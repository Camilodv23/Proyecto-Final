const Todo = require("../models/todo.models");

// GET ALL

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json(allTodos);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

// CRUD (funciones para luego usar en las routes)

// POST
const createTodo = async (req, res) => {
  const { title, completed } = req.body;
  try {
    const newTodo = new Todo({
      title,
      completed,
    });

    await newTodo.save();
    res.status(201).json({
      status: "OK",
      message: "Todo creado correctamente",
      data: newTodo,
    });
    console.log(newTodo);
  } catch (err) {
    console.error("Error al crear el todo", err);
    res.status(500).json({ message: err });
  }
};

// GET

const getOneTodo = async (req, res) => {
  try {
    const oneTodo = await Todo.findById(req.params.todoId);
    if (!oneTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(oneTodo);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

// PUT

const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const updateData = req.body;
    const options = { new: true }; // devuelve el documento actualizado
    const result = await Todo.findByIdAndUpdate(todoId, updateData, options);
    res.status(200).json(result);
    console.log("todoId:", todoId);
    console.log("updateData:", updateData);
    console.log(result);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

// DELETE

const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const data = await Todo.findByIdAndDelete(todoId);
    res.status(200).json(`Todo: ${data.title} has been deleted`);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getOneTodo,
  updateTodo,
  deleteTodo,
};
