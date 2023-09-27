import { Body, Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { Not } from 'typeorm';
import { PrefixType } from '../../../common/constants/global.constant';
import { StatusCode } from '../../../common/constants/status-code.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { BadRequestExc } from '../../../common/exceptions/custom.exception';
import { CreateAndUpdateServiceSellReqDto } from '../../dtos/req/create-service-sell.dto.req';
import { GetListServiceSellReqDto } from '../../dtos/req/get-list-service-sell.dto.req';
import { GetDetailServiceSellResDto } from '../../dtos/res/get-detail-service-sell.dto.res';
import { StatusServicesSellDefineCode } from '../../enums/service-sell.enums';
import { CategoryServiceSellsRepository } from '../../repositories/category-service-sells.repository';
import { ServiceSellsRepository } from '../../repositories/service-sell.repository';
import { ViewerServiceSellRepository } from '../../repositories/viewer-service-sell.repository';

@Injectable()
export class AdminServiceSellService {
  constructor(
    private serviceSellsRepo: ServiceSellsRepository,
    private viewerServiceSellRepo: ViewerServiceSellRepository,
    private categoryServiceSellsRepo: CategoryServiceSellsRepository,
  ) {}

  async getDetail(id: number) {
    const serviceSell = await this.serviceSellsRepo.findOne({
      where: {
        id,
      },
      relations: {
        category_service_sell: true,
      },
    });
    if (!serviceSell)
      throw new BadRequestExc(StatusCode.NO_SERVICE_SELL_EXISTS);

    const result = GetDetailServiceSellResDto.fromUser({
      data: serviceSell,
    });

    return AppResponseDto.fromNonePagination(result);
  }

  async deleteServiceSell(id: number) {
    const serviceSell = await this.serviceSellsRepo.findOneBy({
      id,
    });

    if (!serviceSell)
      throw new BadRequestExc(StatusCode.NO_SERVICE_SELL_EXISTS);

    await this.serviceSellsRepo.delete(id);

    return AppResponseDto.fromNonePagination({ idDeleted: id });
  }
  async getList(query: GetListServiceSellReqDto, headers: any) {
    const { category_service_sell_ids, descending, limit, page, sort_by } =
      query;
    if (limit >= 600 || limit < 1) {
      throw new BadRequestExc(StatusCode.INVALID_LIMIT_REQUEST);
    }

    const queryBuilder = this.serviceSellsRepo
      .createQueryBuilder('service_sells')
      .leftJoinAndSelect(
        'service_sells.category_service_sell',
        'category_service_sell',
      );

    if (category_service_sell_ids) {
      queryBuilder.andWhere(
        'service_sells.category_service_sell_id = :category_service_sell_ids ',
        { category_service_sell_ids },
      );
    }
    if (sort_by) {
      queryBuilder.orderBy(
        sort_by || 'created_at',
        descending ? 'DESC' : 'ASC',
      );
    }
    const { items, meta } = await paginate(queryBuilder, { limit, page });

    const data = await Promise.all(
      items.map(async (serviceSell) => {
        const viewer_count = await this.viewerServiceSellRepo.countBy({
          service_sell_id: serviceSell.id,
        });
        return {
          ...serviceSell,
          viewer_count,
        };
      }),
    );

    return AppResponseDto.fromPagination({
      data,
      limit,
      meta,
      page,
      url: `${headers?.host}/${PrefixType.ADMIN}/service_sells`,
    });
  }

  async createServiceSell(@Body() body: CreateAndUpdateServiceSellReqDto) {
    const {
      name,
      category_service_sell_id,
      description,
      images,
      name_str_filter,
      phone_number_seller_service,
      price,
      seller_service_name,
      service_sell_icon,
    } = body;

    const category = await this.categoryServiceSellsRepo.findOneBy({
      id: category_service_sell_id,
    });
    if (!category)
      throw new BadRequestExc(StatusCode.NO_CATEGORY_SERVICE_SELL_EXISTS);
    if (!name) throw new BadRequestExc(StatusCode.NAME_IS_REQUIRED);

    const serviceSell = await this.serviceSellsRepo.findOneBy({
      name,
    });
    if (serviceSell) throw new BadRequestExc(StatusCode.NAME_ALREADY_EXISTS);

    const createdServiceSell = await this.serviceSellsRepo.save({
      name,
      category_service_sell_id,
      name_str_filter,
      price,
      images: images ? JSON.stringify(images) : JSON.stringify([]),
      status: StatusServicesSellDefineCode.PROGRESSING,
      seller_service_name,
      service_sell_icon,
      description,
      phone_number_seller_service,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return AppResponseDto.fromNonePagination(createdServiceSell);
  }

  async updateServiceSell(@Body() body: CreateAndUpdateServiceSellReqDto) {
    const {
      service_sell_id,
      name,
      category_service_sell_id,
      description,
      images,
      name_str_filter,
      phone_number_seller_service,
      price,
      seller_service_name,
      service_sell_icon,
      status,
    } = body;
    const serviceSellExists = await this.serviceSellsRepo.findOneBy({
      id: service_sell_id,
    });
    if (!serviceSellExists)
      throw new BadRequestExc(StatusCode.NO_SERVICE_SELL_EXISTS);
    const serviceSellNameExists = await this.serviceSellsRepo.findOneBy({
      id: Not(service_sell_id),
      name,
    });
    if (serviceSellNameExists)
      throw new BadRequestExc(StatusCode.NAME_ALREADY_EXISTS);

    const category = await this.categoryServiceSellsRepo.findOneBy({
      id: category_service_sell_id,
    });
    if (!category)
      throw new BadRequestExc(StatusCode.NO_CATEGORY_SERVICE_SELL_EXISTS);

    if (name) serviceSellExists.name = name;
    if (category_service_sell_id) serviceSellExists.category_service_sell_id;
    if (name_str_filter)
      serviceSellExists.name_str_filter = name_str_filter.toLowerCase();
    if (price) serviceSellExists.price = price;
    if (images) serviceSellExists.images = JSON.stringify(images);
    if (status) serviceSellExists.status = status;
    if (description) serviceSellExists.description = description;
    if (seller_service_name)
      serviceSellExists.seller_service_name = seller_service_name;
    if (service_sell_icon)
      serviceSellExists.service_sell_icon = service_sell_icon;
    if (phone_number_seller_service)
      serviceSellExists.phone_number_seller_service =
        phone_number_seller_service;

    const serviceSellUpdated = await this.serviceSellsRepo.save(
      serviceSellExists,
    );

    return AppResponseDto.fromNonePagination(serviceSellUpdated);
  }
}
