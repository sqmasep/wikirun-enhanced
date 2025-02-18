"use client";

import { apiClient } from "../lib/apiClient";

export default function Test() {
  return (
    <div>
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
