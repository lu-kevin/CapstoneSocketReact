const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected with id: ${socket.id}`);

    socket.on("sendMsg", (data) => {
        console.log(data);
        socket.broadcast.emit("getMsg", data);
    });

    //socket.on("ReactCommand", (data) => {
        //console.log(data);
    //});

});

server.listen(3002, () => {
    console.log("Server is running.");
});

//