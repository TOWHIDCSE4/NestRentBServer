// service.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllContractsRequest } from './dto/get-all-contract.dto';
import { ManageContractService } from './manage-contract.service';

@ApiTags('Manage Contract')
@Controller('user/manage/contracts')
export class ManageContractController {
  constructor(private readonly manageContractService: ManageContractService) {}

  @Get()
  async getAll(@Query() request: GetAllContractsRequest) {
    const res = await this.manageContractService.getAll(request);
    return res;
  }
}
