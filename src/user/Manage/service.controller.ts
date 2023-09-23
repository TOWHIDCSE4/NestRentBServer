// service.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';

@ApiTags('Services')
@Controller('manage/services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get(':userId')
  async getAllByUserId(@Param('userId') userId: number) {
    const services = await this.serviceService.getAllByUserId(userId);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }
}
