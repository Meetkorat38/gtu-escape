import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "@/features/admin/schemas";
import { createAdminSession } from "@/features/admin/server/auth";


const app = new Hono()
  // Admin Route
  .post("/", zValidator("json", loginSchema), async (c) => {
    const { email, password } = await c.req.json();

    if (
      email === process.env.NEXT_ADMIN_EMAIL! &&
      password === process.env.NEXT_ADMIN_PASSWORD!
    ) {
      const token = await createAdminSession(email);
      c.header(
        "Set-Cookie",
        `admin_token=${token}; HttpOnly; Path=/; Max-Age=7200`
      );
      return c.json({ success: true });
    }

    return c.json({ error: "Unauthorized" }, 401);
  })
  
export default app;
