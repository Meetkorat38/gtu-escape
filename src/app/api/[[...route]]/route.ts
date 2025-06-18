import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import admin from "@/features/admin/server/index"

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/admin" , admin)


export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes