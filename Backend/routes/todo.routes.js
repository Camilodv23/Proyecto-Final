const express = require("express");
const {
  getAllTodos,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos.controllers");

const router = express.Router();

router.get("/", getAllTodos);

router.get("/:todoId", getOneTodo);

router.post("/", createTodo);

router.put("/:todoId", updateTodo);

router.delete("/:todoId", deleteTodo);

module.exports = router;
