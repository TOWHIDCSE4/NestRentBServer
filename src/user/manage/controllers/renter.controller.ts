import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRenterDto } from '../dtos/create.renter.dto';
import { UpdateRenterDto } from '../dtos/update.renter.dto';
import { RenterService } from '../services/renters.service';

@ApiTags('Renters')
@Controller('user/manage/renters')
export class RenterController {
  constructor(private readonly renterService: RenterService) {}
  @Post()
  async create(@Body() createRenterDto: CreateRenterDto) {
    try {
      // Call your service to create a renter
      const renter = await this.renterService.createRenter(createRenterDto);

      return {
        code: HttpStatus.OK,
        success: true,
        msg_code: 'SUCCESS',
        msg: 'Renter created successfully',
        data: renter,
      };
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          success: false,
          msg_code: 'ERROR',
          msg: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAll() {
    const services = await this.renterService.getAll();

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Get(':renter_id')
  async getInfoByServiceId(@Param('renter_id') renter_id: number) {
    try {
      const services = await this.renterService.getByServiceId(renter_id);
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
        msg: `Not found any data with renter id ${renter_id}`,
        data: null,
      };
    }
  }

  @Delete(':renter_id')
  async delete(@Param('renter_id') renter_id: number) {
    const services = await this.renterService.deleteByid(renter_id);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Put(':renter_id')
  async Update(
    @Param('renter_id') renter_id: number,
    @Body() updateRenter: UpdateRenterDto,
  ) {
    const services = await this.renterService.update(renter_id, updateRenter);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }
}
