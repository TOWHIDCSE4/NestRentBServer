import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { HttpAdapterHost } from '@nestjs/core';
import { AppEnvironment } from '../enums/app.enum';
import { CustomException } from '../exceptions/custom.exception';
import { ErrorResponse } from '../interfaces/error-res.interface';
import { tryParseJson } from '../utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const path = httpAdapter.getRequestUrl(ctx.getRequest());

    this.logException(exception, path);

    let status: number;
    let message: string;
    let msg_code: string;
    let success: boolean;

    if (exception instanceof CustomException) {
      status = exception.code;
      msg_code = exception.msg_code;
      success = exception.success;
      message = exception.msg;
    } else if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as any;

      if (response?.message?.length) {
        status = HttpStatus.BAD_REQUEST;
        const jsonMsg = tryParseJson(response.message[0]);

        message = response?.message?.length ? jsonMsg : 'common.exc.badRequest';
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'common.exc.internalServerError';
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'common.exc.internalServerError';
    }

    const responseBody: ErrorResponse = {
      code: status,
      msg: message,
      msg_code: msg_code,
      success,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }

  private logException(exception: any, path: string) {
    if (exception instanceof NotFoundException) return;
    if (exception instanceof BadRequestException) return;

    if (process.env.NODE_ENV !== AppEnvironment.TEST) {
      console.log(`exception at ${path}: `, exception);
    }
  }
}
