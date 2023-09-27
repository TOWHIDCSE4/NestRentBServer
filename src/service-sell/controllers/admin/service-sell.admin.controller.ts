import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../../common/constants/global.constant';
import { AuthenticateAdmin } from '../../../common/decorators/auth.decorator';
import { CreateAndUpdateServiceSellReqDto } from '../../dtos/req/create-service-sell.dto.req';
import { GetListServiceSellReqDto } from '../../dtos/req/get-list-service-sell.dto.req';
import { AdminServiceSellService } from '../../services/admin/service-sell.admin.service';

@Controller(`${PrefixType.ADMIN}/service_sells`)
@ApiTags('Admin service sell')
@AuthenticateAdmin()
export class ServiceSellAdminController {
  constructor(private adminServiceSellService: AdminServiceSellService) {}

  @Delete(':id')
  deleteServiceSell(@Param('id') id: number) {
    return this.adminServiceSellService.deleteServiceSell(id);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.adminServiceSellService.getDetail(id);
  }

  @Get()
  getList(@Query() query: GetListServiceSellReqDto, @Headers() headers) {
    return this.adminServiceSellService.getList(query, headers);
  }

  @Post()
  createServiceSell(@Body() body: CreateAndUpdateServiceSellReqDto) {
    return this.adminServiceSellService.createServiceSell(body);
  }

  @Put()
  updateServiceSell(@Body() body: CreateAndUpdateServiceSellReqDto) {}
}
