import * as dotenv from 'dotenv';
import { RecursiveKeyOf } from '../types/utils.type';
dotenv.config();

const globalConfig = {
  environment: process.env.NODE_ENV,
  port: +process.env.PORT || 5000,

  serverDomain: process.env.SERVER_DOMAIN,

  urlUploadImage: process.env.URL_UPLOAD_IMAGE,

  urlUploadVideo: process.env.URL_UPLOAD_VIDEO,
  redis: {
    standAlone: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    sentinels:
      process.env.REDIS_SENTINELS?.split('|')?.map((item) => {
        const [host, port] = item?.split(':') || [];
        return { host, port };
      }) || [],
    password: process.env.REDIS_PASSWORD,
    sentinelPassword: process.env.REDIS_SENTINEL_PASSWORD,
    redisGroupName: 'mymaster',
  },
};

export default globalConfig;
export type GlobalConfig = Record<RecursiveKeyOf<typeof globalConfig>, string>;
