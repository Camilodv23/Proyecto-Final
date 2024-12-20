const Todo = require("../models/todo.models");

const getTaskController = async (req, res) => {
  try {
    const tasks = await Todo.find({ user: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas", error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

module.exports = getTaskController;
