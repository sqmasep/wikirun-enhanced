import { Hono } from "hono";
import { cors } from "hono/cors";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";

const app = new Hono()
  .use(
    "*",
    cors({
      origin: process.env.WEBAPP_URL!,
      credentials: true,
    })
  )
  .get("/", c => {
    return c.json("Hello, world!");
  })
  .route("/auth", authRoutes)
  .route("/users", usersRoutes);

export default app;
