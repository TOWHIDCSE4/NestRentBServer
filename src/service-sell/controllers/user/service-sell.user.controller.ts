import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateUserRequirePhone,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { GetListServiceSellReqDto } from '../../dtos/req/get-list-service-sell.dto.req';
import { UserServiceSellService } from '../../services/user/service-sell.user.service';

@Controller(`${PrefixType.USER}/community/service_sells`)
@ApiTags('User community service')
@AuthenticateUserRequirePhone()
export class ServiceSellUserController {
  constructor(private userServiceSellService: UserServiceSellService) {}

  @Get()
  getList(
    @CurrentUser() user: User,
    @Query() query: GetListServiceSellReqDto,
    @Headers() headers,
  ) {
    return this.userServiceSellService.getList(user, query, headers);
  }

  @Get(':id')
  getDetail(@Param('id') id: number, @CurrentUser() user: User) {
    return this.userServiceSellService.getDetail(id, user);
  }
}
