import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTowerDto } from '../dtos/create.tower.dto';
import { Tower } from '../entities/tower.entity';
import { TowerService } from '../servicies/tower.service';

@ApiTags('Towers')
@Controller('user/manage/towers')
export class TowerController {
  constructor(private readonly towerService: TowerService) {}

  @Post()
  async create(@Body() createtower: CreateTowerDto): Promise<Tower> {
    const service = await this.towerService.createService(createtower);
    return service;
  }

  @Put(':tower_id')
  async update(
    @Param('tower_id') tower_id: number,
    @Body() towerDto: CreateTowerDto,
  ) {
    const service = await this.towerService.update(tower_id, towerDto);
    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: service,
    };
  }

  @Get(':tower_id')
  async getInfoByServiceId(@Param('tower_id') tower_id: number) {
    try {
      const services = await this.towerService.getBytowerId(tower_id);
      return {
        code: 200,
        success: true,
        msg_code: 'SUCCESS',
        msg: 'Success',
        data: services,
      };
    } catch {
      return {
        code: 404,
        success: true,
        msg_code: 'NOT FOUND',
        msg: `Not found any data with tower id ${tower_id}`,
        data: null,
      };
    }
  }

  @Get('/by/' + ':userId')
  async getAllByUserId(@Param('userId') userId: number) {
    const services = await this.towerService.getAllByUserId(userId);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Get()
  async getAll() {
    const services = await this.towerService.getAll();

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Delete(':tower_id')
  async delete(@Param('tower_id') tower_id: number) {
    const services = await this.towerService.deleteByid(tower_id);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }
}
