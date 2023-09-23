export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum Resource {
  ALL = 'all',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export enum ActionAbility {
  CAN = 'can',
  CANNOT = 'cannot',
}
