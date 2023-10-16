import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from '../../../common/typeorm-custom';
import { RenterController } from './controllers/renter.controller';
import { RenterRepository } from './repositories/renter.repository';
import { RenterService } from './services/renters.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([RenterRepository])],
  controllers: [RenterController],
  providers: [RenterService],
})
export class renterModule {}
