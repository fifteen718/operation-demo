const path = require("path");
const express = require("express");
const mockjs = require("express-mockjs");
const port = 3000;
const app = express();
const http = require("http");
const server = http.createServer(app);

app.use("/api", mockjs(path.join(__dirname, "mocks")));
server.listen(port);
server.on("listening", () => {
  console.log(`端口监听在 http://localhost:${port}/api`)
});

// you can use `ode api_interface/app.js` to run it.