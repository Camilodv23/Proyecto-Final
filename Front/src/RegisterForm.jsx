/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./registerStyles.module.css";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado exitosamente");
        onRegister();
      } else {
        alert(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleRegister}>
      <h2 className={styles.formTitle}>Registro</h2>
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
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
