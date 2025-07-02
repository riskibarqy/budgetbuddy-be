import type { Knex } from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_URL,
    migrations: {
      directory: './migrations',
      extension: 'ts',
    },
  },
};

export default config;
