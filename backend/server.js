const PORT = 8081;
const HOST = "0.0.0.0";
const VERSION = "1.0";

const app = require("express")();

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(`API VERSION ${VERSION}`);
});

app.get("/api", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(require('./data.json'));
});

app.listen(PORT, HOST);
console.log(`Running NODE on http://localhost:${PORT} (private)`);