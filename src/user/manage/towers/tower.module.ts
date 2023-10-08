import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from '../../../common/typeorm-custom';
import { TowerController } from './controllers/tower.controller';
import { TowerRepository } from './repositories/tower.repo';
import { TowerService } from './servicies/tower.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([TowerRepository])],
  controllers: [TowerController],
  providers: [TowerService],
})
export class TowerModule {}
