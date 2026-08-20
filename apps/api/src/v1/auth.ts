import { Hono } from 'hono';
import { AuthController } from '@commercex/api';
import { authRateLimiter } from '@commercex/middleware';

export const authRouter = new Hono();
const authController = new AuthController();

authRouter.post('/login', authRateLimiter, async (c) => {
  try {
    const body = await c.req.json();
    const ipAddress = c.req.header('x-forwarded-for') || '127.0.0.1';
    const userAgent = c.req.header('user-agent') || 'Unknown';
    
    const result = await authController.login(body, { ipAddress, userAgent });
    
    if (!result.success) {
      return c.json(result, 401);
    }
    
    return c.json(result, 200);
  } catch (error: any) {
    return c.json({ success: false, error: { message: 'Bad request' } }, 400);
  }
});
