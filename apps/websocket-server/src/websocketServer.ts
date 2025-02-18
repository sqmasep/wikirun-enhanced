import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import app from "./server";

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const wsApp = app.get(
  "/ws",
  upgradeWebSocket(c => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send(`you send ${event.data}`);
      },
      onOpen: (event, ws) => {
        console.log("Connection open!");

        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  })
);

export type WebSocketApp = typeof wsApp;

export default websocket;
