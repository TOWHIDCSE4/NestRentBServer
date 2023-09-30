import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entties/user.entity';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from './entities/contract.entity';
import { Motel } from './entities/motel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motel, Contract, User, ContractService])],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [],
})
export class ContractModule {}
