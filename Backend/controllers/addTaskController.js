const Todo = require("../models/todo.models");

const addTaskController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "titulo no valido" });
    }
    const newTask = new Todo({
      title,
      completed: false,
      user: req.user.id,
    });

    const savedTask = await newTask.save();

    res.status(200).json({
      status: "OK",
      message: "tarea agregada con exito",
      data: savedTask,
    });
  } catch (error) {
    console.error("error al agregar la tarea", error);
    res.status(500).json({ error: "error al procesar la solicitud " });
  }
};

module.exports = addTaskController;
