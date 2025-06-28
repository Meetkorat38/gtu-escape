import { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import jwt from 'jsonwebtoken';


const SESSION_DURATION = 2 * 60 * 60; // 2 hours

export const adminAuthMiddleware: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c, 'admin_token');
  const secret = process.env.NEXT_SESSION_SECRET!;

  if (token) {
    try {
      await jwt.verify(token, secret);
      return next();
    } catch {
      // Invalid or expired
    }
  }

  return c.redirect('/');
};

export const createAdminSession = async (email: string) => {
  const payload = { email, exp: Math.floor(Date.now() / 1000) + SESSION_DURATION };
  const secret = process.env.NEXT_SESSION_SECRET!;
  return await jwt.sign(payload, secret);
};

