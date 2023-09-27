import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import { StatusCode } from '../../../common/constants/status-code.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { BadRequestExc } from '../../../common/exceptions/custom.exception';
import { GetListServiceSellReqDto } from '../../dtos/req/get-list-service-sell.dto.req';
import { GetDetailServiceSellResDto } from '../../dtos/res/get-detail-service-sell.dto.res';
import { ServiceSellsRepository } from '../../repositories/service-sell.repository';
import { ViewerServiceSellRepository } from '../../repositories/viewer-service-sell.repository';

@Injectable()
export class UserServiceSellService {
  constructor(
    private serviceSellsRepo: ServiceSellsRepository,
    private viewerServiceSellRepo: ViewerServiceSellRepository,
  ) {}

  async getDetail(id: number, user: User) {
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

    await this.viewerServiceSellRepo.save({
      service_sell: serviceSell,
      user_id: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return AppResponseDto.fromNonePagination(result);
  }

  async getList(user: User, query: GetListServiceSellReqDto, headers: any) {
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
      url: `${headers?.host}/${PrefixType.USER}/community/service_sells`,
    });
  }
}
