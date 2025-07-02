import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { connectToDatabase, disconnectFromDatabase } from './infrastructure/db/postgres';
import { connectRedis, disconnectRedis } from './infrastructure/db/redis';
import { setupLogging } from './infrastructure/logging';
import { setupAuth } from './infrastructure/auth';
import routes from './interfaces/routes';

const app = express();
const PORT = process.env.PORT || 3000;

setupLogging(app);
setupAuth(app);

app.use(express.json());

app.use('/api', routes);

// Error handler middleware
import { Request, Response, NextFunction } from 'express';

// ...

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('Unexpected error:', err);

  res.status(500).json({
    error: 'Internal server error',
    message: err instanceof Error ? err.message : undefined,
  });
});


async function startServer() {
  try {
    await connectToDatabase();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await disconnectFromDatabase();
  await disconnectRedis();
  process.exit(0);
});
