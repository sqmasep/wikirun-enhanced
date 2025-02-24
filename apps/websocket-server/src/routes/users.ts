import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { validateSessionToken } from "../auth/utils/sessions";

const usersRoutes = new Hono()
  .get("/me", async c => {
    const token = getCookie(c, "session_id");
    console.log("/users/me cookie", token);

    if (token === null || token === undefined) {
      return c.json({
        user: null,
        session: null,
        message: "You are not logged in",
      });
    }

    const { session, user } = await validateSessionToken(token);

    console.log("/users/me token:", token);
    console.log("/users/me session/user:", session, user);

    return c.json({
      // DANGER user is not sanitized
      user,
      session,
      message: `Hello, world! ${token}`,
    });
  })
  .post("/change-username", c => {
    const cookie = getCookie(c, "session_id");
    return c.json({ message: `posted successfully, cookie is: ${cookie}` });
  })
  .post("/change-profile-picture", async c => {
    const token = getCookie(c, "session_id");

    if (token === null || token === undefined) {
      return c.json({ message: "You are not logged in" });
    }

    const { user } = await validateSessionToken(token);

    const body = await c.req.parseBody();
    console.log(body["file"]);

    return c.json({ message: `posted successfully` });
  });

export default usersRoutes;
