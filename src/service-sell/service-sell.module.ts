import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { ServiceSellController } from './controllers/user/service-sell.user.controller';
import { CategoryServiceSellsRepository } from './repositories/category-service-sells.repository';
import { ServiceSellsRepository } from './repositories/service-sell.repository';
import { ServiceSellService } from './services/service-sell.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([
      CategoryServiceSellsRepository,
      ServiceSellsRepository,
    ]),
    AuthModule,
  ],
  controllers: [ServiceSellController],
  providers: [ServiceSellService],
})
export class ServiceSellModule {}
