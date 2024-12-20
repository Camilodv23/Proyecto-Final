const Todo = require("../models/todo.models");
const User = require("../models/user.models");

const getCreatorController = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      // obtener todos los usuarios que tienen tareas
      const creators = await User.find({}, "username");
      return res.status(200).json(creators);
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar tareas asociadas al usuario
    const tasks = await Todo.find({ user: user._id }, "title");
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener creadores o tareas:", error);
    res.status(500).json({ message: "Error al procesar la solicitud" });
  }
};

module.exports = getCreatorController;
