import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateUserRequirePhone,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { ServiceSellService } from '../../services/service-sell.service';

@Controller(`${PrefixType.USER}/community/service_sells`)
export class ServiceSellController {
  constructor(private serviceSellService: ServiceSellService) {}

  @Get(':id')
  @AuthenticateUserRequirePhone()
  getDetail(@Param('id') id: number, @CurrentUser() user: User) {
    return this.serviceSellService.getDetail(id, user);
  }
}
