import 'dotenv/config';
import { Pool, PoolClient, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};

export const getClient = async (): Promise<PoolClient> => {
  const client = await pool.connect();
  return client;
};

export const releaseClient = (client: PoolClient): void => {
  client.release();
};

export const connectToDatabase = async (): Promise<void> => {
  try {
    await pool.query('SELECT 1'); // simple test query to check connection
    console.log('Postgres connected');
  } catch (err) {
    console.error('Failed to connect to Postgres', err);
    throw err;
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  await pool.end();
  console.log('Postgres disconnected');
};
