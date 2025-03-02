import { apiClient } from "#/lib/apiClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const res = await apiClient.users.me.$get(undefined, {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });
  const data = await res.json();

  if (!data.user) {
    redirect("/sign-in");
  }

  return <div>{data.user.username}</div>;
}
