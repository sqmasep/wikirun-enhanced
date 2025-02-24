import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { ArcticFetchError, OAuth2RequestError, generateState } from "arctic";

import { github } from "../auth/providers";
import { fetchGithubUser } from "../auth/utils/users";
import { hashPassword, verifyPassword } from "../auth/utils/passwords";

import {
  createUser,
  findUserByEmail,
  findUserByGithubId,
} from "@repo/database/utils/users";

import { vValidator } from "@hono/valibot-validator";
import { signInSchema } from "@repo/validation/auth/signIn";
import { signUpSchema } from "@repo/validation/auth/signUp";

import {
  deleteSessionTokenCookie,
  generateSessionToken,
  setSessionTokenCookie,
  validateSessionToken,
} from "../auth/utils/sessions";

import {
  createSession,
  invalidateSession,
} from "@repo/database/utils/sessions";

const OAUTH_STATE_MAX_AGE = 60 * 10; // 10 min

const authRoutes = new Hono()
  .get("/github", c => {
    console.log("github auth!!");
    const state = generateState();

    const scopes = ["user:email", "repo"];
    const url = github.createAuthorizationURL(state, scopes);

    setCookie(c, "github_state", state, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN,
      maxAge: OAUTH_STATE_MAX_AGE,
    });

    return c.redirect(url);
  })
  .get("/github/callback", async c => {
    const url = new URL(c.req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const storedState = getCookie(c, "github_state");

    if (code === null || storedState === null || state !== storedState) {
      // 400
      throw new Error("Invalid request");
    }

    try {
      const tokens = await github.validateAuthorizationCode(code);
      const accessToken = tokens.accessToken();

      const githubUserResponse = await fetchGithubUser(accessToken);
      const githubUser = await githubUserResponse.json();

      const githubUserId = githubUser.id;
      const githubUsername = githubUser.login;

      // const claims = decodeIdToken(accessToken);
      // console.log("auth github callback claims", claims);

      // try to find user from db
      const existingUser = await findUserByGithubId(githubUserId);

      // TODO [REFACTOR] findOrCreate?

      // if user already exists, only create a session
      if (existingUser !== null) {
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, existingUser.id);
        setSessionTokenCookie(c, sessionToken, session.expiresAt);

        return c.redirect(process.env.WEBAPP_URL!);
      }

      // if user does not exist, create a new user in the db
      const user = await createUser({
        github_id: githubUserId,
        username: githubUsername,
      });

      // then, create a session
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, user.id);
      setSessionTokenCookie(c, sessionToken, session.expiresAt);

      return c.redirect(process.env.WEBAPP_URL!);
    } catch (e) {
      if (e instanceof OAuth2RequestError) {
        // Invalid authorization code, credentials, or redirect URI
        const code = e.code;
        // ...
      }
      if (e instanceof ArcticFetchError) {
        // Failed to call `fetch()`
        const cause = e.cause;
        // ...
      }
      // Parse error
      return c.json({ success: false, error: e.message });
    }
  })
  .post("/sign-up", vValidator("json", signUpSchema), async c => {
    const { email, password, username } = c.req.valid("json");

    // TODO use zxcvbn to check for weak passwords
    // TODO detect leaked passwords with haveibeenpwned
    // TODO see https://thecopenhagenbook.com/password-authentication

    const hashedPassword = await hashPassword(password);
    const existingUser = await findUserByEmail(email);

    if (existingUser !== null) {
      // WARN error message is leaking informations
      return c.json({ success: false, error: "User already exists" });
    }

    // create a new user in the db
    const newUser = await createUser({ email, hashedPassword, username });

    // TODO i should send a confirmation email here probably

    // create a session
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, newUser.id);
    setSessionTokenCookie(c, sessionToken, session.expiresAt);

    const { hashedPassword: _, ...user } = newUser;
    return c.json({ success: true, userId: user.id, email });
  })
  .post("/sign-in", vValidator("json", signInSchema), async c => {
    const { email, password } = c.req.valid("json");

    // TODO add IP-address based rate limiting
    // TODO see https://thecopenhagenbook.com/password-authentication#:~:text=A%20basic%20example%20is%20to%20block%20all%20attempts%20from%20an%20IP%20address%20for%2010%20minutes%20after%20they%20fail%2010%20consecutive%20attempts

    const user = await findUserByEmail(email);

    if (user === null) {
      // WARN early return may expose timing attacks
      // WARN see: https://thecopenhagenbook.com/password-authentication#:~:text=Even%20when%20returning%20a%20generic%20message%20however%2C%20it%20may%20be%20possible%20to%20determine%20if%20a%20user%20exists%20or%20not%20by%20checking%20the%20response%20times.%20For%20example%2C%20if%20you%20only%20validate%20the%20password%20when%20the%20username%20is%20valid
      return c.json({
        success: false,
        error: "Incorrect username or password",
      });
    }

    const isValid = await verifyPassword(password, user.hashedPassword!);

    // Wrong password, but don't tell the user to avoid bruteforce attacks
    if (!isValid) {
      return c.json({
        success: false,
        error: "Incorrect username or password",
      });
    }

    // User found, password correct
    // create a session
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    setSessionTokenCookie(c, sessionToken, session.expiresAt);

    return c.json({ success: true, email, userId: user.id });
  })
  .post("/logout", async c => {
    // TODO i should use the cached function instead
    // TODO const { session } = await getCurrentSession();
    const token = getCookie(c, "session_id");
    const { session } = await validateSessionToken(token!);

    if (session === null) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await invalidateSession(session.id);
    deleteSessionTokenCookie(c);

    return c.redirect(process.env.WEBAPP_URL!);
  });

export default authRoutes;
