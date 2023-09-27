import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { ServiceController } from './controllers/manage/service.controller';
import { ServiceRepository } from './repositories/service.repository';
import { ServiceManageService } from './services/manage/service.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([ServiceRepository])],
  controllers: [ServiceController],
  providers: [ServiceManageService],
})
export class ServiceModule {}
