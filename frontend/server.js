const express = require("express");
const path = require("path");

const app = express();
const hostname = "127.0.0.1"; // Your server ip address
const port = 3000;

const version = "1.0.0";

app.use(express.static(path.join(__dirname, "/Frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/Frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(
    `[Version ${version}]: Server running at http://${hostname}:${port}/`
  );
});
