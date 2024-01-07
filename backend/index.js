const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes");
const multer = require("multer");
const cors = require("cors");
require('dotenv').config();

const mongoUserName = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD

const app = express();
app.use(express.json()); //bson
app.use(multer().any());

// Enable CORS for all routes
app.use(cors({
  origin: 'https://bms-frontend-hfm3.onrender.com', // Allows access from any origin, adjust in production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true
}));


const port = 3005;

mongoose
  .connect(
    `mongodb+srv://${mongoUserName}:${mongoPassword}@bmscluster.yngdopl.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB Running"))
  .catch((err) => console.log(err));

app.use("/", route);

app.use("/*",  (req, res) =>{
  return res.status(400).send({ status: false, msg: "You Are In Wrong Path" });
});

app.listen(port, function () {
  console.log("Express Running on " + port);
});
