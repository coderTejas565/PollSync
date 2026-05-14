import http from "http"

import dotenv from "dotenv"
import app from "./app.js"
import { Server } from "socket.io"

dotenv.config()

const server = http.createServer(app)

export const io = new Server(server,{
    cors: {
        origin: "http:localhost:5173",

        credentials: true,
    }
})

io.on("connection",(socket) => {
    console.log("Socket Connected",socket.id);
    
})

socket.on("join-poll",(pollId)=>{
    socket.join(pollId)

    console.log(`Joined room: ${pollId}`);
    
})

socket.on("disconnect", () => {
    console.log("Socket disconnected");
    
})

const PORT = process.env.PORT || 8070;

server.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
    
})