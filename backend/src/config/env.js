import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT || 5001),
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  DEMO_MODE: process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === undefined,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

export default env;
