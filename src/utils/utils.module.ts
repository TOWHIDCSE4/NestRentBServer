import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EncryptService } from './services/encrypt.service';
import { UploadService } from './services/upload-file.service';
import { UtilService } from './services/util.service';
import { UuidService } from './services/uuid.service';

@Module({
  imports: [HttpModule],
  providers: [UploadService, UuidService, EncryptService, UtilService],
  exports: [UploadService, UuidService, EncryptService, UtilService],
})
export class UtilsModule {}
