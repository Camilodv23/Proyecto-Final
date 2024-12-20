/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const TaskFilter = ({ onTasksUpdate, token }) => {
  const fetchCompletedTasks = async () => {
    try {
      const url = `http://localhost:3000/todos/completed`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error en la respuesta del servidor");
        return;
      }

      const data = await response.json();
      onTasksUpdate(data); // Actualiza las tareas en App.jsx.
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchCompletedTasks}>
        Filtrar por tareas completadas
      </button>
    </div>
  );
};

export default TaskFilter;
