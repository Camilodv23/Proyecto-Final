import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import styles from "./App.module.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import TaskFilter from "./taskFilter";
import UserFilter from "./UserFilter";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (isRegistered && token) {
      const fetchTasks = async () => {
        try {
          const response = await fetch("http://localhost:3000/todos", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setTasks(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      fetchTasks();
    }
  }, [isRegistered, token]);

  const addTask = async (title) => {
    try {
      const response = await fetch("http://localhost:3000/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newText }),
      });

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
    setIsRegistered(true);
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.todoContainer}>
      {!isRegistered ? (
        showRegister ? (
          <RegisterForm onRegister={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )
      ) : (
        <>
          <h1 className={styles.todoTitle}>Lista de tareas</h1>
          <AddTodoForm onAddNewTask={addTask} />
          <UserFilter onTasksUpdate={setTasks} token={token} />
          <TaskFilter onTasksUpdate={setTasks} token={token} />
          <TodoList
            tasks={tasks}
            onToggleTask={toggleTaskCompletion}
            onRemoveTask={deleteTask}
            onEditTask={editTask}
          />
        </>
      )}
      {!isRegistered && (
        <button onClick={() => setShowRegister((prev) => !prev)}>
          {showRegister
            ? "Ya tenes cuenta? inicia sesion"
            : "No una tenes cuenta? registrate"}
        </button>
      )}
    </div>
  );
};

export default App;
