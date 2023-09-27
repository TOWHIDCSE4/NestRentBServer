import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { OtpCodePhone } from '../entities/otp-code-phone';

@Injectable()
export class OtpCodePhoneRepository extends BaseRepository<OtpCodePhone> {
  constructor(dataSource: DataSource) {
    super(OtpCodePhone, dataSource);
  }
}
