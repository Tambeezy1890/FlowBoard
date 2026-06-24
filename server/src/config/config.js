import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const {
  PORT,
  DB_URI,
  NODE_ENV,
  JWT_SECRET,
  EXPIRES_IN,
  REFRESH_SECRET,
  REFRESH_EXPIRES_IN,
} = process.env;
