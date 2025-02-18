import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import SignUpWithGithubButton from "../features/auth/components/SignInWithGithubButton";
import { apiClient } from "../lib/apiClient";
import Test from "../components/Test";
import { cookies } from "next/headers";

export default async function Home() {
  // const a = (await cookies()).get("session_id")!;
  // console.log("nextjs cookies", a);

  const data = await (
    await apiClient.users.me.$get(undefined, {
      headers: { cookie: (await cookies()).toString() },
    })
  ).json();
  console.log("response via api    ", data);

  return (
    <div className={styles.page}>
      aaaaaaaaaaaaa
      <Test />
      <SignUpWithGithubButton />
    </div>
  );
}
