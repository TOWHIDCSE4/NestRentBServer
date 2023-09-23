import { Injectable } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import { StatusCode } from '../../common/constants/status-code.constant';
import { AppResponseDto } from '../../common/dtos/app-response.dto';
import { BadRequestExc } from '../../common/exceptions/custom.exception';
import { GetDetailServiceSellResDto } from '../dtos/res/get-detail-servive-sell.dto.res';
import { ServiceSellsRepository } from '../repositories/service-sell.repository';

@Injectable()
export class ServiceSellService {
  constructor(private serviceSellsRepo: ServiceSellsRepository) {}

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

    return new AppResponseDto(result);
  }
}
