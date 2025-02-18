import type { WebSocketApp } from "../../../websocket-server/src/websocketServer";
import { hc } from "hono/client";
import { SERVER_URL } from "../data/constants";

export const apiClient = hc<WebSocketApp>(SERVER_URL, {
  init: {
    credentials: "include",
  },
});
