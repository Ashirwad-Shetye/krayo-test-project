require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 5000;

const app = express();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE"],

  origin: ["http://localhost:3000"],
};

app.use(cors(corsOpts));

app.use("/api/file", require("./routes/fileRoutes"));

app.listen(port, () => console.log(`Listening on port ${port}`));
