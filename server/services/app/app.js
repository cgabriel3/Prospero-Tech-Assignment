if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { mongoConnect } = require("./db/config");
const app = express();
const port = 4002;
const cors = require("cors");
const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App Service Connected");
});
app.use("/pajak", router);

mongoConnect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
