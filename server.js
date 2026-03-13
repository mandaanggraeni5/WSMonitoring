const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

console.log("WebSocket server running on port", PORT);

wss.on("connection", function connection(ws) {

  console.log("Client connected");

  ws.on("message", function incoming(data) {

    console.log("Frame received size:", data.length);

    // broadcast ke client lain (viewer)
    wss.clients.forEach(function(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });

  });

  ws.on("close", function() {
    console.log("Client disconnected");
  });

});
