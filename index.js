const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const password = process.env.PASSWORD;
main().catch((err) => console.log(err));
async function main() {
  //   await mongoose.connect('mongodb://127.0.0.1:27017/RegistrationDB');
  await mongoose.connect(
    `mongodb+srv://akash0121:${password}@cluster0.gcyp23s.mongodb.net/RegistrationDB`
  );
  console.log("DataBase Connected");
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User-Detail", userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save().then(() => {
        res.sendFile(__dirname + "/index2.html");
    })
    .catch((err) => {
      console.log(err);
      res.send("Registration failed");
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
