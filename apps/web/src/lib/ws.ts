import { apiClient } from "./apiClient";

class AppWebSocket {
  ws: WebSocket;

  constructor() {
    this.ws = apiClient.ws.$ws({});
  }
}

export const ws = new AppWebSocket();
