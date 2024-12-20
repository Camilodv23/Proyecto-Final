import { useState } from "react";
import styles from "./loginStyles.module.css";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso");
        onLogin(data.token); // Pasar el token al componente principal
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleLogin}>
      <h2 className={styles.formTitle}>Iniciar Sesión</h2>
      <div className={styles.formField}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={styles.formField}>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className={styles.submitButton} type="submit">
        Ingresar
      </button>
    </form>
  );
};
export default LoginForm;
