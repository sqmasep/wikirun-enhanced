import LogoutForm from "#/features/auth/components/forms/LogoutForm";
import { apiClient } from "#/lib/apiClient";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
          <Link href="/profile">My profile</Link>
          <Link href="/profile/someId">Some random profile</Link>
          <LogoutForm />
          {/* <a href={apiClient.auth.logout.$url().toString()}>Logout</a> */}
        </li>
      </ul>
    </nav>
  );
}
