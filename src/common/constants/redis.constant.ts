import dotenv from 'dotenv';
dotenv.config();

export const REDIS_KEY = {
  CHECK_PASSWORD_COUNT: `${process.env.NODE_ENV}:CHECK_PASSWORD_COUNT`,
  LOGIN_COUNT: `${process.env.NODE_ENV}:LOGIN_COUNT`,
  OTP_COUNT: `${process.env.NODE_ENV}:OTP_COUNT`,
};
