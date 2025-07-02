// src/types/express.d.ts
import '@clerk/clerk-sdk-node';
import { AuthObject } from '@clerk/clerk-sdk-node';

declare module 'express' {
  interface Request {
    auth?: AuthObject;
  }
}

export {}; // <-- Add this line