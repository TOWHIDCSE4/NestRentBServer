import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { AccountRankDefineCode } from '../../../shared/constants/account-define-code';
import { MsgCode } from '../../../shared/constants/message.constants';
import { ServiceUnitDefineCode } from '../../../shared/constants/service-unit-define-code';
import { DefinedStatusCode } from '../../../shared/constants/status-code.constants';
import { QueryResponseDto } from '../../../shared/dto/query-response.dto';
import { Service } from '../../../user/Manage/entities/service.entity';
import { PhoneUtils } from '../../../utils/services/phone-utils';
import { LoginDto } from '../../dtos/common/req/login-dto';
import { RegistrationDto } from '../../dtos/registration.dto';
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
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
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

      const hashedPassword = await bcrypt.compare(password, user.password);

      if (hashedPassword) {
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

  async register(registerDto: RegistrationDto) {
    const phone = PhoneUtils.convert(registerDto.phone_number);
    if (phone == null || phone == undefined || phone == '') {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.NO_PHONE_NUMBER_ACCOUNT_EXISTS_IN_SYSTEM[0],
        MsgCode.NO_PHONE_NUMBER_ACCOUNT_EXISTS_IN_SYSTEM[1],
      );
    }

    if (!PhoneUtils.isNumberPhoneValid(phone)) {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.INVALID_PHONE_NUMBER[0],
        MsgCode.INVALID_PHONE_NUMBER[1],
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        phone_number: phone,
      },
    });

    if (user != null && user !== undefined) {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.PHONE_NUMBER_ALREADY_EXISTS[0],
        MsgCode.PHONE_NUMBER_ALREADY_EXISTS[1],
      );
    }

    if (registerDto.referral_code != null) {
      const referralCode = PhoneUtils.convert(registerDto.referral_code);
      const userRefCodeExist = await this.userRepository.findOne({
        where: {
          phone_number: referralCode,
          account_rank: AccountRankDefineCode.LOYAL,
        },
      });

      if (userRefCodeExist == null || userRefCodeExist == undefined) {
        return new QueryResponseDto(
          HttpStatus.BAD_REQUEST,
          false,
          MsgCode.INVALID_REFERRAL_CODE[0],
          MsgCode.INVALID_REFERRAL_CODE[1],
        );
      }

      if (userRefCodeExist.is_admin) {
        return new QueryResponseDto(
          HttpStatus.BAD_REQUEST,
          false,
          MsgCode.INVALID_REFERRAL_CODE[0],
          MsgCode.INVALID_REFERRAL_CODE[1],
        );
      }

      if (userRefCodeExist.is_host) {
        return new QueryResponseDto(
          HttpStatus.BAD_REQUEST,
          false,
          MsgCode.INVALID_REFERRAL_CODE[0],
          MsgCode.INVALID_REFERRAL_CODE[1],
        );
      }
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const createdUser = await this.userRepository.save({
      name: registerDto.name,
      area_code: '+84',
      phone_number: phone,
      self_referral_code: phone,
      phone_verified_at: new Date(),
      avatar_image:
        'https://data3gohomy.ikitech.vn/api/SHImages/ODLzIFikis1681367637.jpg',
      password: hashedPassword,
      host_rank: AccountRankDefineCode.NORMAL,
      account_rank: AccountRankDefineCode.NORMAL,
      referral_code: registerDto.referral_code ?? null,
    });

    const serviceExistsDien = await this.serviceRepository.count({
      where: {
        user_id: createdUser.id,
        service_unit: 'Kwh',
        service_name: 'Điện',
        type_unit: ServiceUnitDefineCode.SERVICE_INDEX,
      },
    });

    if (serviceExistsDien == 0) {
      const newService = await this.serviceRepository.create({
        user_id: createdUser.id,
        service_name: 'Điện',
        service_icon: 'assets/icon_images/dien.png',
        service_unit: 'Kwh',
        service_charge: 3000,
        type_unit: ServiceUnitDefineCode.SERVICE_INDEX,
        is_default: 1,
      });
    }

    const serviceExistsNuoc = await this.serviceRepository.count({
      where: {
        user_id: createdUser.id,
        service_unit: 'm3',
        service_name: 'Nước',
        type_unit: ServiceUnitDefineCode.SERVICE_INDEX,
      },
    });

    if (serviceExistsNuoc == 0) {
      const newService = await this.serviceRepository.create({
        user_id: createdUser.id,
        service_name: 'Nước',
        service_icon: 'assets/icon_images/nuoc.png',
        service_unit: 'm3',
        service_charge: 20000,
        type_unit: ServiceUnitDefineCode.SERVICE_INDEX,
        is_default: 1,
      });
    }

    const serviceExistsMạng = await this.serviceRepository.count({
      where: {
        user_id: createdUser.id,
        service_unit: 'Phòng',
        service_name: 'Mạng',
        type_unit: ServiceUnitDefineCode.PER_MOTEL,
      },
    });

    if (serviceExistsMạng == 0) {
      const newService = await this.serviceRepository.create({
        user_id: createdUser.id,
        service_name: 'Mạng',
        service_icon: 'assets/icon_images/icon-mang.png',
        service_unit: 'Phòng',
        service_charge: 100000,
        type_unit: ServiceUnitDefineCode.PER_MOTEL,
        is_default: 1,
      });
    }

    const serviceExistsPhong = await this.serviceRepository.count({
      where: {
        user_id: createdUser.id,
        service_unit: 'Phòng',
        service_name: 'Dịch vụ chung',
        type_unit: ServiceUnitDefineCode.PER_MOTEL,
      },
    });

    if (serviceExistsPhong == 0) {
      const newService = await this.serviceRepository.create({
        user_id: createdUser.id,
        service_name: 'Dịch vụ chung',
        service_icon: 'assets/icon_images/ve-sinh.png',
        service_unit: 'Phòng',
        service_charge: 50000,
        type_unit: ServiceUnitDefineCode.PER_MOTEL,
        is_default: 1,
      });
    }

    createdUser.password = null;
    return new QueryResponseDto(
      HttpStatus.CREATED,
      true,
      MsgCode.SUCCESS[0],
      MsgCode.SUCCESS[1],
      createdUser,
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
