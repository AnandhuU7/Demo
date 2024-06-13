const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const Contact=require("./routes/Contact");

app.use("/api",Contact);




var mongoDB = "mongodb://127.0.0.1/mydatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("db connected");
  } catch (err) {
    console.error("db connection  error:", error);
  }
};

connectDB();

app.listen(3000, () => {
  console.log("Server Start");
});
