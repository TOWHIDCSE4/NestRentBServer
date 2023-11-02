import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManangeCommissionController } from './commision.controller';
import { CommissionService } from './commision.service';
import { CollaboratorReferMotel } from './entity/collaborator-refer-motels.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollaboratorReferMotel])],
  controllers: [ManangeCommissionController],
  providers: [CommissionService],
})
export class ManangeCommissionModule {}
