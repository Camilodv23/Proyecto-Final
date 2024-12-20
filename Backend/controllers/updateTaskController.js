const Todo = require("../models/todo.models");

const updateTaskController = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, completed } = req.body;
    const options = { new: true }; // devuelve el documento actualizado
    const result = await Todo.findByIdAndUpdate(
      todoId,
      { title, completed },
      options
    );
    if (!result) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json(result);
    console.log("todoId:", todoId);
    console.log("updateData:", title);
    console.log(result);
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

module.exports = updateTaskController;
