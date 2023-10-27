import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressAdditionController } from './address-addition.controller';
import { AddressAdditionService } from './address-addition.service';
import { AddressAddition } from './entity/address-addition.entity';
@Module({
  imports: [TypeOrmModule.forFeature([AddressAddition])],
  controllers: [AddressAdditionController],
  providers: [AddressAdditionService],
})
export class AddressAdditionModule {}
