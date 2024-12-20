/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const UserFilter = ({ onTasksUpdate, token }) => {
  const [creators, setCreators] = useState([]); // Lista de usernames
  const [selectedCreator, setSelectedCreator] = useState(""); // Username seleccionado

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const url = `http://localhost:3000/todos/creators`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Error al cargar los creadores");
          return;
        }

        const data = await response.json();
        setCreators(data);
      } catch (error) {
        console.error("Error al obtener la lista de creadores:", error);
      }
    };

    fetchCreators();
  }, [token]);

  // fetch a las tareas del user
  const fetchTasksByCreator = async (username) => {
    try {
      const url = `http://localhost:3000/todos/creators?username=${username}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error al cargar tareas del creador");
        return;
      }

      const data = await response.json();
      onTasksUpdate(data);
    } catch (error) {
      console.error("Error al obtener las tareas del creador:", error);
    }
  };

  // controlador para cambiar el user(creator)

  const handleCreatorChange = (e) => {
    const username = e.target.value;
    setSelectedCreator(username);
    if (username) {
      fetchTasksByCreator(username); // cargar tareas cuando se selecciona un username
    }
  };

  return (
    <div>
      <label>Filtrar por Creador: </label>
      <select
        id="creator-select"
        value={selectedCreator}
        onChange={handleCreatorChange}
      >
        <option value="">Seleccionar un creador</option>
        {creators.map((creator) => (
          <option key={creator.username} value={creator.username}>
            {creator.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilter;
