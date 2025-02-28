"use client";

import { logout } from "#auth/actions";

export default function LogoutForm() {
  return (
    <form onSubmit={() => logout()}>
      <button type="submit">Logout</button>
    </form>
  );
}
