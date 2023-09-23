import { NonFunctionProperties } from '../types/utils.type';

export class CustomException {
  code: number;
  msg?: string;
  msg_code?: string;
  success?: boolean;

  constructor({
    code,
    msg,
    msg_code,
    success,
  }: NonFunctionProperties<CustomException>) {
    this.code = code;
    this.msg = msg;
    this.msg_code = msg_code;
    this.success = success;
  }
}

export class ForbiddenExc extends CustomException {
  constructor(params: NonFunctionProperties<CustomException>) {
    super({ ...params, code: 403 });
  }
}

export class NotFoundExc extends CustomException {
  constructor(params: NonFunctionProperties<CustomException>) {
    super({ ...params, code: 404 });
  }
}

export class UnauthorizedExc extends CustomException {
  constructor(params: NonFunctionProperties<CustomException>) {
    super({ ...params, code: 401 });
  }
}

export class ConflictExc extends CustomException {
  constructor(params: NonFunctionProperties<CustomException>) {
    super({ ...params, code: 409 });
  }
}

export class BadRequestExc extends CustomException {
  constructor(params: NonFunctionProperties<CustomException>) {
    super({ ...params, code: 400 });
  }
}

export class InternalServerErrorExc extends CustomException {
  constructor(params: NonFunctionProperties<Omit<CustomException, 'status'>>) {
    super({ ...params, code: 500 });
  }
}

export class ExpectationFailedExc extends CustomException {
  constructor(params: NonFunctionProperties<Omit<CustomException, 'status'>>) {
    super({ ...params, code: 417 });
  }
}

export class ServiceUnavailableExc extends CustomException {
  constructor(params: NonFunctionProperties<Omit<CustomException, 'status'>>) {
    super({ ...params, code: 503 });
  }
}
