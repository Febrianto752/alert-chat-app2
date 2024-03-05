import { io } from "socket.io-client";
const socket = io('ws://localhost:80')

export default socket