const Todo = require("../models/todo.models");

const deleteTaskController = async (req, res) => {
  const { todoId } = req.params;
  try {
    const deletedTask = await Todo.findByIdAndDelete(todoId);
    if (!deletedTask) {
      return res.status(404).json({ error: "tarea no encontrada" });
    }

    res.status(200).json({ message: "tarea eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la tarea", error);
    return res.status(500).json({ error: "error al eliminar la tarea" });
  }
};

module.exports = deleteTaskController;
