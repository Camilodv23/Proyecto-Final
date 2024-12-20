/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "../App.module.css";

const AddTodoForm = ({ onAddNewTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    onAddNewTask(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Escribe una nueva tarea..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className={styles.addButton}>
        ➕
      </button>
    </form>
  );
};

export default AddTodoForm;
