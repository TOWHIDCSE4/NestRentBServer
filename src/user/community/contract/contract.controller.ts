import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractQueryDto } from './dtos/contract.dto';
import { ContractService } from './contract.service';

@ApiTags('Contract')
@Controller('user/community/contract')
export class ContractController {
  constructor(private contractService: ContractService) {}
  @Get()
  async getAllContracts(@Query() queryDto: ContractQueryDto) {
    try {
      const listContracts = await this.contractService.getAllContracts(queryDto);

      return {
        code: 200,
        success: true,
        msg_code: 'SUCCESS',
        msg: 'Success',
        data: listContracts,
      };
    } catch (error) {
      // Handle errors
      return {
        code: 500,
        success: false,
        msg_code: 'INTERNAL_SERVER_ERROR',
        msg: 'Internal Server Error',
        error: error.message,
      };
    }
  }

}
