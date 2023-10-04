import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from '../../community/contract/entities/contract.entity';
import { ManageContractController } from './manage-contract.controller';
import { ManageContractService } from './manage-contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  controllers: [ManageContractController],
  providers: [ManageContractService],
})
export class ManageContractModule {}
