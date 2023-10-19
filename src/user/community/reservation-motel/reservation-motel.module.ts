import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoPost } from '../home/entity/mo-post.entity';
import { ReservationMotel } from './entity/reservation-motel.entity';
import { ReservationMotelController } from './reservation-motel.controller';
import { ReservationMotelService } from './reservation-motel.service';
@Module({
  imports: [TypeOrmModule.forFeature([ReservationMotel, MoPost])],
  controllers: [ReservationMotelController],
  providers: [ReservationMotelService],
})
export class ReservationMotelModule {}
