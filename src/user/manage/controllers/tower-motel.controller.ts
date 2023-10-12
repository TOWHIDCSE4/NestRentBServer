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
import { CreateTowerMotelDto } from '../dtos/create.tower-motel.dto';
import { UpdateTowerMotelDto } from '../dtos/update-tower-motel.dto';
import { TowerMotelService } from '../services/tower-motel.service';

@ApiTags('Tower Motel')
@Controller('manage/tower_motels')
export class TowerMotelController {
  constructor(private readonly towerMotelService: TowerMotelService) {}
  @Post()
  async create(@Body() createTowerMotelDto: CreateTowerMotelDto) {
    // Call your service to create a renter
    const towerMotelRes = await this.towerMotelService.create(
      createTowerMotelDto,
    );
    return towerMotelRes;
  }

  @Put()
  async updateTowerByRoom(@Body() updateTowerMotelDto: UpdateTowerMotelDto) {
    const updatedTowerMotel = await this.towerMotelService.update(
      updateTowerMotelDto,
    );
    return updatedTowerMotel;
  }

  @Get(':tower_id')
  async getAllMotelTower(@Param('tower_id') towerId: number) {
    const getAll = await this.towerMotelService.getAll(towerId);
    return getAll;
  }

  @Delete(':tower_id')
  async deleteMotelTower(@Param('tower_id') towerMotelId: number) {
    const deleteMotelTower = await this.towerMotelService.delete(towerMotelId);
    return deleteMotelTower;
  }
}
