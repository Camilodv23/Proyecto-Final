const express = require("express");
const addTaskController = require("../controllers/addTaskController.js");
const deleteTaskController = require("../controllers/deleteTaskController.js");
const updateTaskController = require("../controllers/updateTaskController.js");
const getTaskController = require("../controllers/getTaskController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const getCompletedTasksController = require("../controllers/getCompletedTasksController.js");
const getCreatorController = require("../controllers/getCreatorController.js");

const router = express.Router();

router.get("/", authMiddleware, getTaskController);
router.post("/", authMiddleware, addTaskController);
router.put("/:todoId", authMiddleware, updateTaskController);
router.delete("/:todoId", authMiddleware, deleteTaskController);

// get filtrado para tareas completadas

router.get("/completed", authMiddleware, getCompletedTasksController);

// get filtrado para creadores

router.get("/creators", authMiddleware, getCreatorController);

module.exports = router;
