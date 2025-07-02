import '@clerk/clerk-sdk-node';
import { AuthObject } from '@clerk/clerk-sdk-node';

// Augment Express' Request type
declare module 'express-serve-static-core' {
  interface Request {
    auth?: AuthObject;
  }
}
