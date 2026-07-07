import { Elysia, t } from "elysia"
import { auth } from "@/lib/auth"
import { authMiddleware } from "@/middleware/auth"

export const authRoutes = new Elysia()
  .use(authMiddleware)
  .mount(auth.handler)
  .get(
    "/users/:id",
    ({ params: { id }, user }) => ({
      id,
      name: user?.name ?? "Unknown",
      email: user?.email ?? "unknown@example.com",
    }),
    {
      params: t.Object({
        id: t.String(),
      }),
      response: t.Object({
        id: t.String(),
        name: t.String(),
        email: t.String(),
      }),
    }
  )
