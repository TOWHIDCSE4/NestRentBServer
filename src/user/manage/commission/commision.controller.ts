import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommissionService } from './commision.service';
import { CommissionDto } from './dto/commision.dto';
import { UpdateCommissionDto } from './dto/update-commision.dto';

@ApiTags('Manage Commission')
@Controller('user/manage/commission_collaborator')
export class ManangeCommissionController {
  constructor(private readonly commisionService: CommissionService) {}

  @Get()
  async getAll(@Query() request: CommissionDto) {
    const getAll = await this.commisionService.getAllCommission(request);
    return getAll;
  }

  @Put(':commission_collaborator_id')
  async updateTowerByRoom(
    @Param('commission_collaborator_id') id: number,
    @Body() updateCommissionDto: UpdateCommissionDto,
  ) {
    const updatedTowerMotel = await this.commisionService.update(
      id,
      updateCommissionDto,
    );
    return updatedTowerMotel;
  }

  @Get(':commission_collaborator_id')
  async getAllMotelTower(@Param('commission_collaborator_id') id: number) {
    const getAll = await this.commisionService.getOne(id);
    return getAll;
  }
}
