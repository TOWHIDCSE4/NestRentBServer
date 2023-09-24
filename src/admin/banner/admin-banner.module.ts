import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBannerController } from './admin-banner.controller';
import { AdminBannerService } from './admin-banner.service';
import { DBAdminBanner } from './entity/admin-banner.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DBAdminBanner])],
  controllers: [AdminBannerController],
  providers: [AdminBannerService],
})
export class AdminBannerModule {}
