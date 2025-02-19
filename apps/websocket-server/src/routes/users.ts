import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { validateSessionToken } from "../auth/utils/sessions";

const usersRoutes = new Hono()
  .get("/me", async c => {
    const token = getCookie(c, "session_id");
    console.log("/users/me cookie", token);

    if (token !== null || token !== undefined) {
      const { session, user } = await validateSessionToken(token);

      return c.json({
        user,
        session,
        message: `Hello, world! ${token}`,
      });
    }

    return c.json({ message: "You are not logged in" });
  })
  .post("/change-username", c => {
    const cookie = getCookie(c, "session_id");
    return c.json({ message: `posted successfully, cookie is: ${cookie}` });
  });

export default usersRoutes;
