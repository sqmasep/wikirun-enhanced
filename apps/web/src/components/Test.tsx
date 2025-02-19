"use client";

import { useEffect } from "react";
import { apiClient } from "../lib/apiClient";

const ws = apiClient.ws.$ws();

export default function Test() {
  useEffect(() => {
    ws.onmessage = function (event) {
      console.log(`Message from server: ${event.data}`);
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          ws.send("hello from client");
        }}
      >
        send msg with ws
      </button>
      <button
        onClick={() => {
          apiClient.users.me
            .$get()
            .then(res => res.json())
            .then(data => {
              console.log(data);
            });
        }}
      >
        fetch /users/me
      </button>
    </div>
  );
}
