import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoService } from './entity/mo-service';
import { MoServiceController } from './mo-service.controller';
import { MoServiceService } from './mo-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([MoService])],
  controllers: [MoServiceController],
  providers: [MoServiceService],
  exports: [TypeOrmModule],
})
export class MoServiceModule {}
