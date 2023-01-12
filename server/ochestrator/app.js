if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Orchestrator Connected");
});
app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
