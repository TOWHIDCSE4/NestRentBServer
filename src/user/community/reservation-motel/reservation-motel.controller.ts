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
import { CreateReservationMotelDto } from './dtos/reservation-motel-create.dto';
import { ReservationMotelGetOneQueryDto } from './dtos/reservation-motel-get-one.dto';
import { ReservationMotelQueryDto } from './dtos/reservation-motel-get.dto';
import { ReservationMotelUpdateDto } from './dtos/reservation-motel-update.dto';
import { ReservationMotelService } from './reservation-motel.service';

@ApiTags('Reservation Motel')
@Controller('community/reservation_motel')
export class ReservationMotelController {
  constructor(
    private readonly reservationMotelService: ReservationMotelService,
  ) {}

  @Get()
  async getAll(@Query() queryDto: ReservationMotelQueryDto) {
    const response = await this.reservationMotelService.getAll(
      queryDto.user_id,
      queryDto.status,
      queryDto.limit,
    );
    return response;
  }

  @Post()
  async create(@Body() createReservationMotelDto: CreateReservationMotelDto) {
    const response = await this.reservationMotelService.createReservationMotel(
      createReservationMotelDto,
    );
    return response;
  }

  @Get(':reservation_id')
  async getOne(
    @Query() query: ReservationMotelGetOneQueryDto,
    @Param('reservation_id') reservationId: number,
  ) {
    const response = await this.reservationMotelService.getOne(
      query.user_id,
      reservationId,
    );
    return response;
  }

  @Put(':reservation_id')
  async update(
    @Body() createReservationMotelDto: ReservationMotelUpdateDto,
    @Param('reservation_id') reservationId: number,
  ) {
    const response = await this.reservationMotelService.update(
      createReservationMotelDto,
      reservationId,
    );
    return response;
  }

  @Delete(':reservation_id')
  async delete(
    @Param('reservation_id') reservationId: number,
    @Query() query: ReservationMotelGetOneQueryDto,
  ) {
    const response = await this.reservationMotelService.deleteReservationMotel(
      query.user_id,
      reservationId,
    );
    return response;
  }
}
