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

    console.log("token is not null or undefined");

    const { session, user } = await validateSessionToken(token);

    console.log(token);
    console.log(session, user);

    return c.json({
      user,
      session,
      message: `Hello, world! ${token}`,
    });
  })
  .post("/change-username", c => {
    const cookie = getCookie(c, "session_id");
    return c.json({ message: `posted successfully, cookie is: ${cookie}` });
  });

export default usersRoutes;
