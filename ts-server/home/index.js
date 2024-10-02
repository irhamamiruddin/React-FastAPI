"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const PORT = 5050;
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
// // Parsing JSON
// app.use(express.json());
// // Enable CORS
// app.use(cors({ origin: "*" }));
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User connected:", socket.id);
    // When a user disconnects
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });
    // Server is pinged
    socket.on("ping-server", (payload) => {
        console.log("ping", payload);
    });
}));
// Start the server and listen on the pre-defined port
server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    // if build directory exists, serve static files
    if (fs_1.default.existsSync("./build")) {
        app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
        app.get("*", (req, res) => {
            res.sendFile("index.html", { root: "./build" });
        });
    }
    else {
        console.log("build directory not found");
    }
});
// Handle server errors
server.on("error", (error) => {
    console.error("Server error:", error);
});
