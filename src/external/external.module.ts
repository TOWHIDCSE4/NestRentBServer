import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ExternalController } from './controllers/external.controller';
import { ExternalService } from './services/file.external.service';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [ExternalController],
  providers: [ExternalService],
  exports: [ExternalService],
})
export class ExternalModule {}
