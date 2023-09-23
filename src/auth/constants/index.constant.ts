export enum StrategyName {
  USER = 'jwt-authen-user',
  ADMIN = 'jwt-authen-admin',
  CUSTOMER = 'jwt-authen-customer',
}

export const CHECK_PASSWORD_CONFIG = {
  MAX_RETRY_TIME: 5,
  BLOCK_EXP: 3600, //seconds = 1h
};
