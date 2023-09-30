import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motel } from './entities/motel.entity';
import { Contract } from './entities/contract.entity';
import { User } from '../../entties/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motel, Contract, User])],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [],
})
export class ContractModule {}
