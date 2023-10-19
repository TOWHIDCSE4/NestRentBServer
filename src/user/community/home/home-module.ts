import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBAdminBanner } from '../../../admin/banner/entity/admin-banner.entity';
import { CategoryServiceSells } from '../../../service-sell/entities/category-service-sells.entity';
import { ServiceSells } from '../../../service-sell/entities/service-sell.entity';
import { Motel } from '../contract/entities/motel.entity';
import { HomeController } from './controllers/home.controller';
import { AdminContact } from './entity/admin-contracts.entity';
import { AdminDiscoverItemUi } from './entity/admin-discover-item-ui.entity';
import { AdminDiscoverUi } from './entity/admin-discover-ui.entity';
import { ConfigAdmin } from './entity/config-admin.entity';
import { MoPostFindMotel } from './entity/mo-post-find-motels.entity';
import { MoPostRoommate } from './entity/mo-post-roommate.entity';
import { MoPost } from './entity/mo-post.entity';
import { HomeService } from './services/home.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConfigAdmin,
      AdminDiscoverUi,
      AdminDiscoverItemUi,
      Motel,
      MoPost,
      MoPostFindMotel,
      MoPostRoommate,
      DBAdminBanner,
      ServiceSells,
      CategoryServiceSells,
      AdminContact,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
