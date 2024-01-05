const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes");
const multer = require("multer");

const app = express();
app.use(express.json()); //bson
app.use(multer().any());
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://hitanshusoni10:charmendar123@bmscluster.yngdopl.mongodb.net/?retryWrites=true&w=majority",
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
