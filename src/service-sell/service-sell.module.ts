import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { ServiceSellAdminController } from './controllers/admin/service-sell.admin.controller';
import { ServiceSellUserController } from './controllers/user/service-sell.user.controller';
import { CategoryServiceSellsRepository } from './repositories/category-service-sells.repository';
import { ServiceSellsRepository } from './repositories/service-sell.repository';
import { ViewerServiceSellRepository } from './repositories/viewer-service-sell.repository';
import { AdminServiceSellService } from './services/admin/service-sell.admin.service';
import { UserServiceSellService } from './services/user/service-sell.user.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([
      CategoryServiceSellsRepository,
      ServiceSellsRepository,
      ViewerServiceSellRepository,
    ]),
    AuthModule,
  ],
  controllers: [ServiceSellUserController, ServiceSellAdminController],
  providers: [UserServiceSellService, AdminServiceSellService],
})
export class ServiceSellModule {}
