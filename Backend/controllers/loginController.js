const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // comparar contraseñas

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    // generar el token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      "clave_secreta",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Iniciaste sesion ", token });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = loginController;
