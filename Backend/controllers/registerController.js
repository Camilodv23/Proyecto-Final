const bcrypt = require("bcrypt");
const User = require("../models/user.models");

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: " Su nombre de usuario ya esta en uso" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("No se ha podido crear el usuario", error);
    res.status(500).json({ message: "Error en el servidor " });
  }
};

module.exports = registerController;
