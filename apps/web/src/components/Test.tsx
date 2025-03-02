"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";
import { getPageInfosFromTitle } from "@repo/wikipedia/utils/page";

const ws = apiClient.ws.$ws();

export default function Test() {
  const [value, setValue] = useState("");
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof getPageInfosFromTitle> | null>>(null);

  useEffect(() => {
    ws.onmessage = function (event) {
      console.log(`Message from server: ${event.data}`);
    };
  }, []);

  useEffect(() => {
    async function get() {
      const data = await getPageInfosFromTitle("en", value);
      console.log(value, data);
      setResult(data);
    }

    get();
  }, [value]);

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      result ({value}):
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <img
        src={result?.thumbnail.source}
        width={result?.thumbnail.width}
        height={result?.thumbnail.height}
        alt={result?.title}
      />
      {/* <button
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
      </button> */}
    </div>
  );
}
