import LogoutForm from "#/features/auth/components/forms/LogoutForm";
import { apiClient } from "#/lib/apiClient";
import { Button } from "@repo/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Navbar() {
  const res = await apiClient.users.me.$get(undefined, {
    headers: {
      cookie: (await cookies()).toString(),
    },
  });
  const data = await res.json();

  console.log(data);

  return (
    <nav className="container mx-auto">
      <Button>some button</Button>
      <div className="bg-amber-300 text-jar-400">testok</div>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile/someId">Some random profile</Link>
        </li>
        {data.user ? (
          <>
            <li>
              <Link href="/profile">My profile</Link>
            </li>
            <li>
              <LogoutForm />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/sign-in">Sign in</Link>
            </li>
            <li>
              <Link href="/sign-up">Sign up</Link>
            </li>
          </>
        )}
        {/* <a href={apiClient.auth.logout.$url().toString()}>Logout</a> */}
      </ul>
    </nav>
  );
}
