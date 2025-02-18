import { Hono } from "hono";
import { getCookie } from "hono/cookie";

const usersRoutes = new Hono()
  .get("/me", c => {
    const cookie = getCookie(c, "session_id");
    console.log("/users/me cookie", cookie);
    return c.json({ message: `Hello, world! ${cookie}` });
  })
  .post("/change-username", c => {
    const cookie = getCookie(c, "session_id");
    return c.json({ message: `posted successfully, cookie is: ${cookie}` });
  });

export default usersRoutes;
