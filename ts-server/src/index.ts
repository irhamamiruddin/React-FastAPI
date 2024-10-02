import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import fs from "fs";
import path from "path";

const PORT = 5050;
const app = express();
const server = new http.Server(app);
const io = new Server(server, { cors: { origin: "*" } });

// // Parsing JSON
// app.use(express.json());

// // Enable CORS
// app.use(cors({ origin: "*" }));

io.on("connection", async (socket: any) => {
    console.log("User connected:", socket.id);

    // When a user disconnects
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });

    // Server is pinged
    socket.on("ping-server", (payload: any) => {
        console.log("ping", payload);
    });
});

// Start the server and listen on the pre-defined port
server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    // if build directory exists, serve static files
    if (fs.existsSync("./build")) {
        app.use(express.static(path.join(__dirname, "build")));
        app.get("*", (req: any, res: any) => {
            res.sendFile("index.html", { root: "./build" });
        });
    } else {
        console.log("build directory not found");
    }
});

// Handle server errors
server.on("error", (error) => {
    console.error("Server error:", error);
});