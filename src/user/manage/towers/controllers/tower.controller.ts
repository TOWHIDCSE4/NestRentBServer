import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TowerService } from '../servicies/tower.service';

@ApiTags('Towers')
@Controller('user/manage/towers')
export class TowerController {
  constructor(private readonly towerService: TowerService) {}

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
