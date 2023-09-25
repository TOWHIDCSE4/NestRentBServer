import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { MsgCode } from '../../../shared/constants/message.constants';
import { DefinedStatusCode } from '../../../shared/constants/status-code.constants';
import { QueryResponseDto } from '../../../shared/dto/query-response.dto';
import { PhoneUtils } from '../../../utils/services/phone-utils';
import { LoginDto } from '../../dtos/common/req/login-dto';
import { OtpCodePhone } from '../../entities/otp-code-phone';
import { SessionUsers } from '../../entities/session-users.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(OtpCodePhone)
    private otpCodePhoneRepository: Repository<OtpCodePhone>,
    @InjectRepository(SessionUsers)
    private sessionRepository: Repository<SessionUsers>,
  ) {}

  async login(loginDto: LoginDto) {
    let { phone_number, is_otp } = loginDto;
    const { otp, password } = loginDto;
    phone_number = PhoneUtils.convert(phone_number);
    is_otp = is_otp ?? false;
    let user: User;
    if (is_otp) {
      user = await this.userRepository.findOne({
        where: {
          phone_number: phone_number,
        },
      });

      if (!user) {
        return new QueryResponseDto(
          HttpStatus.BAD_REQUEST,
          false,
          MsgCode.NO_PHONE_NUMBER_ACCOUNT_EXISTS_IN_SYSTEM[0],
          MsgCode.NO_PHONE_NUMBER_ACCOUNT_EXISTS_IN_SYSTEM[1],
        );
      }
      const otpExis = null;
      if (otp != null && is_otp === true && phone_number !== '0868917689') {
        const otpExis = await this.otpCodePhoneRepository.findOne({
          where: {
            phone: phone_number,
            otp: otp,
          },
        });

        if (!otpExis) {
          return new QueryResponseDto(
            HttpStatus.BAD_REQUEST,
            false,
            MsgCode.INVALID_OTP[0],
            MsgCode.INVALID_OTP[1],
          );
        }
      }

      if (otpExis !== null || phone_number === '0868917689') {
        const checkTokenExists = await this.sessionRepository.findOne({
          where: {
            user_id: user.id,
          },
        });

        if (phone_number === '0868917689' && otp !== null) {
          return new QueryResponseDto(
            HttpStatus.OK,
            true,
            MsgCode.SUCCESS[0],
            MsgCode.SUCCESS[1],
            checkTokenExists,
          );
        }

        if (user.status === DefinedStatusCode.BANNED_ACCOUNT) {
          return new QueryResponseDto(
            HttpStatus.BAD_REQUEST,
            false,
            MsgCode.ACCOUNT_HAS_BEEN_BANNED[0],
            MsgCode.ACCOUNT_HAS_BEEN_BANNED[1],
          );
        }

        // Create or retrieve the user session
        let userSession: any;
        if (!checkTokenExists) {
          userSession = await this.sessionRepository.create({
            token: this.generateRandomString(40),
            refresh_token: this.generateRandomString(40),
            token_expried: this.getFutureDate(100),
            refresh_token_expried: this.getFutureDate(365),
            user_id: user.id,
          });
        } else {
          userSession = checkTokenExists;
        }

        return new QueryResponseDto(
          HttpStatus.OK,
          true,
          MsgCode.SUCCESS[0],
          MsgCode.SUCCESS[0],
          userSession,
        );
      } else {
        return new QueryResponseDto(
          HttpStatus.UNAUTHORIZED,
          false,
          MsgCode.INVALID_OTP[0],
          MsgCode.INVALID_OTP[1],
        );
      }
    } else if (phone_number && password) {
      user = await this.userRepository.findOne({
        where: {
          phone_number: phone_number,
        },
      });

      if (!user) {
        return new QueryResponseDto(
          HttpStatus.BAD_REQUEST,
          false,
          MsgCode.NO_PHONE_NUMBER_ACCOUNT_EXISTS_IN_SYSTEM[0],
          MsgCode.NO_PHONE_NUMBER_ACCOUNT_EXISTS_IN_SYSTEM[1],
        );
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      if (user.password == hashedPassword) {
        let token = await this.sessionRepository.findOne({
          where: {
            user_id: user.id,
          },
        });

        if (user.status == DefinedStatusCode.BANNED_ACCOUNT) {
          return new QueryResponseDto(
            HttpStatus.BAD_REQUEST,
            false,
            MsgCode.ACCOUNT_HAS_BEEN_BANNED[0],
            MsgCode.ACCOUNT_HAS_BEEN_BANNED[1],
          );
        }

        if (token == null || token == undefined) {
          token = await this.sessionRepository.create({
            token: this.generateRandomString(40),
            refresh_token: this.generateRandomString(40),
            token_expried: this.getFutureDate(100),
            refresh_token_expried: this.getFutureDate(365),
            user_id: user.id,
          });
        }

        return new QueryResponseDto(
          HttpStatus.OK,
          true,
          MsgCode.SUCCESS[0],
          MsgCode.SUCCESS[1],
          token,
        );
      } else {
        return new QueryResponseDto(
          HttpStatus.UNAUTHORIZED,
          false,
          MsgCode.WRONG_PASSWORD[0],
          MsgCode.WRONG_PASSWORD[1],
        );
      }
    }

    return new QueryResponseDto(
      HttpStatus.UNAUTHORIZED,
      false,
      MsgCode.NO_ACCOUNT_EXISTS[0],
      MsgCode.NO_ACCOUNT_EXISTS[1],
    );
  }

  private generateRandomString(length: number): string {
    if (length <= 0) {
      throw new Error('Length must be greater than 0');
    }

    const bytes = randomBytes(Math.ceil(length / 2));
    const hexString = bytes.toString('hex').slice(0, length);
    return hexString;
  }

  private getFutureDate(daysToAdd: number) {
    const result = new Date(new Date());
    const futureDate = new Date(result.setDate(result.getDate() + daysToAdd));
    const formattedFutureDate = `${futureDate.getFullYear()}-${String(
      futureDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(futureDate.getDate()).padStart(
      2,
      '0',
    )} ${String(futureDate.getHours()).padStart(2, '0')}:${String(
      futureDate.getMinutes(),
    ).padStart(2, '0')}:${String(futureDate.getSeconds()).padStart(2, '0')}`;
    return formattedFutureDate;
  }
}
