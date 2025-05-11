const express = require("express");
const expressWs = require("express-ws");
const app = express();
const port = 8080;

expressWs(app);

const clients = new Set();

app.ws("/chat", (ws, req) => {
	clients.add(ws);

	ws.on("message", message => {
		clients.forEach(client => {
			if (client.readyState === ws.OPEN) {
				client.send(message.toString());
			}
		});
	});

	ws.on("close", () => {
		clients.delete(ws);
	});
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
