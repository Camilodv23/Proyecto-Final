/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onToggleTask, onRemoveTask, onEditTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          item={task}
          onToggleTask={onToggleTask}
          onRemoveTask={onRemoveTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TodoList;
