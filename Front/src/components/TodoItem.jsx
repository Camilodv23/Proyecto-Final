/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../App.module.css";

const TodoItem = ({ item, onToggleTask, onRemoveTask, onEditTask }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.title);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (!newText.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    try {
      await onEditTask(item._id, newText);
      setEditing(false);
    } catch (error) {
      console.error("Error al guardar el nuevo título:", error);
    }
  };

  return (
    <div
      className={`${styles.todoItem} ${item.completed ? styles.completed : ""}`}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggleTask(item._id)}
      />
      {editing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button className={styles.saveButton} onClick={handleSave}>
            ✔️
          </button>
        </div>
      ) : (
        <span className={styles.todoText}>{item.title}</span>
      )}
      <button
        className={styles.deleteButton}
        onClick={() => onRemoveTask(item._id)}
      >
        🗑️
      </button>
      {!editing && (
        <button className={styles.editButton} onClick={handleEdit}>
          📝
        </button>
      )}
    </div>
  );
};

export default TodoItem;
