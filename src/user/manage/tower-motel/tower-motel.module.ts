import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motel } from '../../community/contract/entities/motel.entity';
import { Tower } from '../towers/entities/tower.entity';
import { TowerMotelController } from './controller/tower-motel.controller';
import { TowerMotel } from './entities/tower-motel.entity';
import { TowerMotelService } from './service/tower-motel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tower, Motel, TowerMotel])],
  controllers: [TowerMotelController],
  providers: [TowerMotelService],
})
export class TowerMotelModule {}
