import { Pool, PoolConfig } from "pg";
import { configinfo } from "./config";

const config: PoolConfig = {
  // connectionString: process.env.DATABASE_URL,
  host: configinfo.databaseHost,
  port: configinfo.databasePort,
  database: configinfo.databaseName,
  user: configinfo.databaseUser,
  password: configinfo.databasePassword,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

export const pool = new Pool(config);
