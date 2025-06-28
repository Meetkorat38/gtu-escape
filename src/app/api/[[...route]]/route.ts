import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import admin from "@/features/admin/server/index";
import auth from "@/features/auth/server/index";

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
.route("/login" , auth)
.route("/admin", admin)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes