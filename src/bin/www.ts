#!/usr/bin/env node

import app from "../app";
import http from "http";

import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/appt-tc")
  .then(() => console.log("Connected with database...!"));

const PORT = process.env.PORT || 9091;
console.log(`Server running on port ${PORT}`);
const server = http.createServer(app);

server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  ('Listening on ' + bind);
}


// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
