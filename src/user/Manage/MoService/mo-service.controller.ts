// service.controller.ts
import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMoServiceDto } from './dtos/UpdateMoServiceDto';
import { MoServiceService } from './mo-service.service';

@ApiTags('MoService')
@Controller('user/manage/mo_services')
export class MoServiceController {
  constructor(private readonly MosSrviceService: MoServiceService) {}

  @Put(':mo_service_id')
  async update(
    @Param('mo_service_id') mo_service_id: number,
    @Body() updateMoServiceDto: UpdateMoServiceDto,
  ) {
    try {
      const service = await this.MosSrviceService.update(
        mo_service_id,
        updateMoServiceDto,
      );
      return {
        code: 200,
        success: true,
        msg_code: 'SUCCESS',
        msg: 'Success',
        data: service,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          code: 404,
          success: true,
          msg_code: 'BAD REQUEST',
          msg: 'Mo Service Not Found with that Id',
          data: null,
        };
      }
    }
  }
}