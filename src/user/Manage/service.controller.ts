// service.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create.service.dto';
import { Service } from './entities/service.entity';
import { ServiceService } from './service.service';

@ApiTags('Services')
@Controller('user/manage')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('/services/' + ':userId')
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

  @Get('/services')
  async getAll() {
    const services = await this.serviceService.getAll();

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Post('/services')
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    const service = await this.serviceService.createService(createServiceDto);

    return service;
  }

  @Get('/mo_services/motel_id/' + ':mo_service_id')
  async getAllByServiceId(@Param('mo_service_id') mo_service_id: number) {
    const services = await this.serviceService.getByServiceId(mo_service_id);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }
}
