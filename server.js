import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

// Listen for connection events from clients
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;
  console.log(`New connection from ${ip}`);

  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(`server: ${message}`);
    });
  });

  socket.on("error", (error) => {
    console.error(`Error from ${ip}: ${error.message}`);
  });

  socket.on("close", () => {
    console.log(`Client ${ip} disconnected`);
  });
});

console.log("WebSocket server is running on ws://localhost:8000");
