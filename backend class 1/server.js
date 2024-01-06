// server instantiate
const express = require("express");
const app = express();

// used to parse req.body in express -> PUT or POST
const bodyParser = require("body-parser");
// specifically parse JSON data and add it to the   request.body object
app.use(bodyParser.json());

// activate the server on port 3000
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/cars", (req, res) => {
  const { name, brand } = req.body;
  console.log(name);
  console.log(brand);
  res.send("car submitted successfully");
});

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/myDatabase", {
    useNewurlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log("Received an error");
  });
