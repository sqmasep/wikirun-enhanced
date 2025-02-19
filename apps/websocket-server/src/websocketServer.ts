import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import app from "./server";
import { getCookie } from "hono/cookie";
import { validateSessionToken } from "./auth/utils/sessions";

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const wsApp = app.get(
  "/ws",
  upgradeWebSocket(async c => {
    const token = getCookie(c, "session_id");
    console.log("/ws cookie", token);

    if (token === null || token === undefined) {
      throw new Error("You are not logged in");
    }

    const { session, user } = await validateSessionToken(token);

    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send(
          `you send ${event.data}, you are connected as ${user?.username}`
        );
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
