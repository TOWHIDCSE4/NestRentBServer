import { HttpStatus } from '@nestjs/common';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';
export class AppMetaDto {
  status: number;
  message?: string;
  error?: string;
  subInfo?: any;
}

export class AppPaginationDto {
  current_page: number;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  next_page_url?: string;
  to?: number;
  total: number;

  static fromNestPagination({ limit, meta, page, url }: MetaPaginationReq) {
    const result = new AppPaginationDto();
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < meta.totalPages ? page + 1 : null;

    result.current_page = meta.currentPage;
    result.first_page_url = `${url}?page=1&limit=${limit}`;
    result.from = (page - 1) * limit + 1;
    result.last_page = meta.totalPages;
    result.last_page_url = `${url}?page=${meta.totalPages}&limit=${limit}`;
    result.path = url;
    result.per_page = meta.itemsPerPage;
    result.prev_page_url = prevPage
      ? `${url}?page=${prevPage}&limit=${limit}`
      : null;
    result.next_page_url = nextPage
      ? `${url}?page=${nextPage}&limit=${limit}`
      : null;
    result.total = meta.totalItems;
    result.to = page * limit < meta.totalItems ? page * limit : meta.totalItems;

    return result;
  }
}

export class AppResponseDto {
  code: HttpStatus;
  success?: boolean;
  msg_code?: string;
  msg?: string;
  data?: any;

  constructor(data?: any) {
    this.code = 200;
    this.success = true;
    this.msg_code = 'SUCCESS';
    this.msg = 'THÀNH CÔNG';
  }

  static fromPagination({ data, limit, meta, page, url }: IMetaPagingApp) {
    const result = new AppResponseDto(data);
    const pagination = AppPaginationDto.fromNestPagination({
      limit,
      meta,
      url,
      page,
    });
    result.data = { ...pagination };
    result.data.data = data;

    return result;
  }

  static fromNonePagination(data: any, statusCode?: HttpStatus) {
    const result = new AppResponseDto(data);
    if (statusCode) result.code = statusCode;
    result.data = typeof data === 'undefined' ? null : data;
    return result;
  }
}

export interface MetaPaginationReq {
  meta: IPaginationMeta;
  url: string;
  limit: number;
  page: number;
}

export interface IMetaPagingApp {
  data: any;
  meta: IPaginationMeta;
  url: string;
  limit: number;
  page: number;
}
