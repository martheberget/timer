const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/index.html"));
});

app.listen(port, () => {
  console.log(`Timer listening on port ${port}`);
});
