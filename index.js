const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = require("./app");

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cpypwfl.mongodb.net/trainDB?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGO_URI).then(() => {
  console.log("DB connected");
});

app.listen(port, () => {
  console.log("Train is running");
});
