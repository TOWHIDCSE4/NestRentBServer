import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motel } from '../community/contract/entities/motel.entity';
import { TowerMotelController } from './controllers/tower-motel.controller';
import { TowerMotel } from './entities/tower-motel.entity';
import { TowerMotelService } from './services/tower-motel.service';
import { Tower } from './towers/entities/tower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tower, Motel, TowerMotel])],
  controllers: [TowerMotelController],
  providers: [TowerMotelService],
})
export class TowerMotelModule {}
