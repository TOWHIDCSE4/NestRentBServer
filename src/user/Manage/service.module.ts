import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [TypeOrmModule],
})
export class ServiceModule {}
