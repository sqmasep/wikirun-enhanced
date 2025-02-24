import { apiClient } from "#/lib/apiClient";
import { SignInSchemaOutput } from "@repo/validation/auth/signIn";
import { SignUpSchemaOutput } from "@repo/validation/auth/signUp";

// WARN these are all client-side actions actually
// WARN i tried to make them server-side but i had cookie issues
// WARN see comments in the functions to see why

export async function signIn(data: SignInSchemaOutput) {
  const res = await apiClient.auth["sign-in"].$post({
    json: {
      email: data.email,
      password: data.password,
    },
  });

  // WARN possible alternative solution:
  // WARN the API could return a token to the client (while setting a Set-Cookie header?)
  // WARN so the client can store the token in localStorage or a cookie, like here in NextJS server-side
  // WARN and the client could also use the API like a Bearer token (would probably need a tiny refactor in ws server)

  const json = await res.json();
  console.log(json);

  if (json.success) {
    // force reload to get new session
    // WARN this is a workaround because redirect() will not update the ws connection
    // WARN since you're initially not logged-in, the ws connection will not be authenticated
    // WARN and redirect() will not update the ws connection
    window.location.href = "/";
  }
}

export async function signUp(data: SignUpSchemaOutput) {
  const res = await apiClient.auth["sign-up"].$post({
    json: {
      email: data.email,
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });

  const d = await res.json();

  if (d.success) {
    // force reload to get new session
    // WARN look at the comment in signIn() above for why this is necessary
    window.location.href = "/";
  }
}

export async function logout() {
  // WARN should probably use a POST request here
  await apiClient.auth.logout.$post();

  // force reload to get new session
  // WARN look at the comment in signIn() above for why this is necessary
  window.location.href = "/";
}
