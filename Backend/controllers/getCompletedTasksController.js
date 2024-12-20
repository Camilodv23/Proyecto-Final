const Todo = require("../models/todo.models");

const getCompletedTasksController = async (req, res) => {
  try {
    const tasks = await Todo.find({
      user: req.user.id,
      completed: true, // filtro para las tareas completadas
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas completadas:", error);
    res.status(500).json({ message: "Error al procesar la solicitud" });
  }
};

module.exports = getCompletedTasksController;
