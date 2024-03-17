const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const conn_key = process.env.CONNECTION_STRING;
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(conn_key);

const BirthdaySchema = new mongoose.Schema({
  id: Number,
  description: String,
});

const WishModel = mongoose.model("Birthdaywishes", BirthdaySchema);

app.get("/getWish", async (req, res) => {
  try {
    const result = await WishModel.find();
    res.json({ birthdaywishes: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/postWish", async (req, res) => {
  console.log(req.body);
  const wish = new WishModel(req.body);
  try {
    await wish.save();
    res.status(201).json({ wish });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
