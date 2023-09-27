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
  INVALID_LIMIT_REQUEST: {
    code: 400,
    msg: 'Số lượng bản ghi được lấy không hợp lệ',
    msg_code: 'INVALID_LIMIT_REQUEST',
    success: false,
  },
  UNABLE_TO_FIND_THE_UPLOAD_IMAGE: {
    code: 400,
    msg: 'Không tìm thấy ảnh up lên',
    msg_code: 'INVALID_LIMIT_REQUEST',
    success: false,
  },
  CANNOT_POST_PICTURES: {
    code: 400,
    msg: 'Không thể đăng ảnh',
    msg_code: 'CANNOT_POST_PICTURES',
    success: false,
  },
  CANNOT_POST_VIDEOS: {
    code: 400,
    msg: 'Không thể đăng video',
    msg_code: 'CANNOT_POST_VIDEOS',
    success: false,
  },
  NO_CATEGORY_SERVICE_SELL_EXISTS: {
    code: 400,
    msg: 'Không tồn tại danh mục bán dịch vụ',
    msg_code: 'NO_CATEGORY_SERVICE_SELL_EXISTS',
    success: false,
  },
  NAME_IS_REQUIRED: {
    code: 400,
    msg: 'Tên không được trống',
    msg_code: 'NAME_IS_REQUIRED',
    success: false,
  },
  NAME_ALREADY_EXISTS: {
    code: 400,
    msg: 'Tên đã tồn tại',
    msg_code: 'NAME_ALREADY_EXISTS',
    success: false,
  },
  WITHDRAW_MONEY_IS_REQUIRED: {
    code: 400,
    msg: 'Withdraw Money Required',
    msg_code: 'WITHDRAW_MONEY_IS_REQUIRED',
    success: false,
  },
  WITHDRAWAL_MONEY_CANNOT_GREATER_THAN_BALANCE: {
    code: 400,
    msg: 'Số tiền rút không thể lớn hơn số dư',
    msg_code: 'WITHDRAWAL_MONEY_CANNOT_GREATER_THAN_BALANCE',
    success: false,
  },
};

type StatusCodeKey =
  | 'INVALID_TOKEN'
  | 'NOT_HAVE_ACCESS_TOKEN'
  | 'PLEASE_UPDATE_YOUR_NUMBER_PHONE'
  | 'NO_SERVICE_SELL_EXISTS'
  | 'INVALID_LIMIT_REQUEST'
  | 'UNABLE_TO_FIND_THE_UPLOAD_IMAGE'
  | 'CANNOT_POST_PICTURES'
  | 'CANNOT_POST_VIDEOS'
  | 'NO_CATEGORY_SERVICE_SELL_EXISTS'
  | 'NAME_IS_REQUIRED'
  | 'NAME_ALREADY_EXISTS'
  | 'WITHDRAW_MONEY_IS_REQUIRED'
  | 'WITHDRAWAL_MONEY_CANNOT_GREATER_THAN_BALANCE';
