import { Request, Response, NextFunction, Application } from 'express';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

// Middleware from Clerk
const clerkMiddleware = ClerkExpressWithAuth();

// Attach Clerk middleware globally to app
export const setupAuth = (app: Application): void => {
  app.use(clerkMiddleware);
};

// Middleware to protect routes (only for authenticated users)
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};