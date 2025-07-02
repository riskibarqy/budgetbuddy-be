import { Request, Response, NextFunction, Application } from 'express';
import { AuthObject } from '@clerk/clerk-sdk-node';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

interface AuthenticatedRequest extends Request {
  auth?: AuthObject;
}

// Middleware from Clerk
const clerkMiddleware = ClerkExpressWithAuth();

// Attach Clerk middleware globally to app
export const setupAuth = (app: Application): void => {
  app.use(clerkMiddleware);
};

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
