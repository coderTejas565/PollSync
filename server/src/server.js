
import http from "http";

import dotenv from "dotenv"
import { Server } from "socket.io";

import app from "./app.js";

import {registerSocketHandlers,setIO, } from "./modules/socket/socket.handler.js";

dotenv.config()

const server = http.createServer(app);

const io = new Server(server, {

  cors: {

    origin:
      process.env.CLIENT_URL,

    credentials: true,

  },

  transports: [
    "websocket"
  ],

});

setIO(io);

registerSocketHandlers(io);

const PORT =
  process.env.PORT || 8070;

server.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});