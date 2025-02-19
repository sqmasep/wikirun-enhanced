import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import SignUpWithGithubButton from "../features/auth/components/SignInWithGithubButton";
import { apiClient } from "../lib/apiClient";
import Test from "../components/Test";
import { cookies } from "next/headers";

export default async function Home() {
  const a = (await cookies()).get("session_id")!;
  console.log("nextjs cookies", a);

  // const data = await (
  //   await apiClient.users.me.$get(undefined, {
  //     headers: { cookie: (await cookies()).toString() },
  //   })
  // ).json();

  const cook = (await cookies()).toString();
  const response = await apiClient.users.me.$get(undefined, {
    headers: { cookie: cook },
  });
  const data = await response.json();

  console.log("response via api    ", data);

  return (
    <div className={styles.page}>
      {data.user ? (
        <div>
          <h1>Hello, {data.user.username}!</h1>
        </div>
      ) : (
        <div>You are not logged in</div>
      )}
      <Test />
      <SignUpWithGithubButton />
    </div>
  );
}
