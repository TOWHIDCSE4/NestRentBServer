import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Put, Query, Req, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractQueryDto } from './dtos/contract.dto';
import { ContractService } from './contract.service';
import { UpdateContractDto } from './dtos/update-contract.dto';

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
                msg: 'THÀNH CÔNG',
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
                msg: 'THÀNH CÔNG',
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

    @Delete(':id')
    async contractDelete(@Param('id') id: string, @Param('phone_number') phone_number: string, @Req() request: Request) {
        const renterPhoneNumber = phone_number; // Assuming you have user information in the request

        try {
            const contract = await this.contractService.contractDelete(
                +id, // Convert id to number
                renterPhoneNumber,
            );
            return {
                code: 200,
                success: true,
                msg_code: 'SUCCESS',
                msg: 'THÀNH CÔNG',
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

    @Put(':id')
    async updateContract(
        @Param('id') id: number,
        @Body() updateContractDto: UpdateContractDto,
    ) {
        const response = await this.contractService.updateContract(id, updateContractDto, updateContractDto.userPhoneNumber);
        return response;
    }
}
