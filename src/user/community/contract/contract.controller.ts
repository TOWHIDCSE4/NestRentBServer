import { Controller, Get, NotFoundException, Param, Query, Req, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractQueryDto } from './dtos/contract.dto';
import { ContractService } from './contract.service';

@ApiTags('Contract')
@Controller('user/community/contract')
export class ContractController {
    constructor(private contractService: ContractService) { }
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
                code: 400,
                success: false,
                msg_code: 'INVALID_DATETIME_QUERY',
                msg: 'Thời gian truy vấn không hợp lệ',
            };
        }
    }

    @Get(':id')
    async getContractById(@Param('id') id: string, @Param('phone_number') phone_number: string, @Req() request: Request) {
        const renterPhoneNumber = phone_number; // Assuming you have user information in the request

        try {
            const contract = await this.contractService.getContractById(
                +id, // Convert id to number
                renterPhoneNumber,
            );
            return {
                code: 200,
                success: true,
                msg_code: 'SUCCESS',
                msg: 'Contract retrieved successfully',
                data: contract,
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                // Handle not found error
                return {
                    code: 400,
                    success: false,
                    msg_code: 'NO_CONTRACT_EXISTS',
                    msg: 'Hợp đồng đã thanh lý hoặc không còn hiệu lực',
                };
            }
            // Handle other errors
            return {
                code: 500,
                success: false,
                msg_code: 'INTERNAL_SERVER_ERROR',
                msg: 'Internal server error',
            };
        }
    }
}
