const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes.js");
const taskRoutes = require("./routes/tasksRoutes.js");
const register = require("./routes/authRoutes.js");
const login = require("./routes/loginRoutes.js");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

const port = process.env.PORT || 3000;

db.on("error", (err) => {
  console.log(`Mongo DB error connection : ${err} `);
});

db.once("open", () => {
  console.log("Connected to MongoDb");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//  front fetch

app.use("/todos", taskRoutes);

// register user

app.use("/auth/register", register);

// login

app.use("/auth/login", login);

app.listen(port, () => {
  console.log(`srv local corriendo en ${port}`);
});
