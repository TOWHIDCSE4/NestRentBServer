import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressAdditionService } from './address-addition.service';
import { CreateAddressAdditionDto } from './dto/address-addition-create.dto';
import { AddressAdditionGetQueryDto } from './dto/address-addition-get.dto';

@ApiTags('Address Addition')
@Controller('user/community/address_additions')
export class AddressAdditionController {
  constructor(
    private readonly addressAdditionService: AddressAdditionService,
  ) {}

  @Get()
  async getAll(@Query() queryDto: AddressAdditionGetQueryDto) {
    const response = await this.addressAdditionService.getAll(queryDto);
    return response;
  }

  @Post()
  async create(@Body() createReservationMotelDto: CreateAddressAdditionDto) {
    const response = await this.addressAdditionService.create(
      createReservationMotelDto,
    );
    return response;
  }

  @Get(':address_id')
  async getOne(@Param('address_id') addressId: number) {
    const response = await this.addressAdditionService.getOne(addressId);
    return response;
  }

  @Put(':address_id')
  async update(
    @Body() createAddressAdditionDto: CreateAddressAdditionDto,
    @Param('address_id') addressId: number,
  ) {
    const response = await this.addressAdditionService.update(
      createAddressAdditionDto,
      addressId,
    );
    return response;
  }

  @Delete(':address_id')
  async delete(@Param('address_id') addressId: number) {
    const response = await this.addressAdditionService.delete(addressId);
    return response;
  }
}
