import { io } from "socket.io-client";

const ENDPOINT = "ws://localhost:5051";

const socket = io(ENDPOINT);

export default socket;