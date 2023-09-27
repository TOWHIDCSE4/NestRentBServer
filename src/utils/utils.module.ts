import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EncryptService } from './services/encrypt.service';
import { UtilService } from './services/util.service';
import { UuidService } from './services/uuid.service';

@Module({
  imports: [HttpModule],
  providers: [UuidService, EncryptService, UtilService],
  exports: [UuidService, EncryptService, UtilService],
})
export class UtilsModule {}
