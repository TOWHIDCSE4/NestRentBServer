import { IStatusCode } from '../interfaces/status-code.interface';

export const StatusCode: Record<StatusCodeKey, IStatusCode> = {
  INVALID_TOKEN: {
    code: 401,
    msg: 'Chưa đăng nhập bạn không có quyền truy cập',
    msg_code: 'NO_TOKEN',
    success: false,
  },
  NOT_HAVE_ACCESS_TOKEN: {
    code: 401,
    msg: 'Bạn không phải admin',
    msg_code: 'NOT_HAVE_ACCESS',
    success: false,
  },
  PLEASE_UPDATE_YOUR_NUMBER_PHONE: {
    code: 400,
    msg: 'Vui lòng cập nhật số điện thoại của bạn',
    msg_code: 'PLEASE_UPDATE_YOUR_NUMBER_PHONE',
    success: false,
  },
  NO_SERVICE_SELL_EXISTS: {
    code: 400,
    msg: 'Không tồn tại bán dịch vụ này',
    msg_code: 'NO_SERVICE_SELL_EXISTS',
    success: false,
  },
};

type StatusCodeKey =
  | 'INVALID_TOKEN'
  | 'NOT_HAVE_ACCESS_TOKEN'
  | 'PLEASE_UPDATE_YOUR_NUMBER_PHONE'
  | 'NO_SERVICE_SELL_EXISTS';
