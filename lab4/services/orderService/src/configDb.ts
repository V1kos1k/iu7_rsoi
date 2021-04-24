import { Pool, PoolConfig } from 'pg';
import { configinfo } from './config';

const config: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const pool = new Pool(config);
