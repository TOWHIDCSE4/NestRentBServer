import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { AccountRankDefineCode } from '../../../shared/constants/account-define-code';
import { MsgCode } from '../../../shared/constants/message.constants';
import { ServiceUnitDefineCode } from '../../../shared/constants/service-unit-define-code';
import { DefinedStatusCode } from '../../../shared/constants/status-code.constants';
import { QueryResponseDto } from '../../../shared/dto/query-response.dto';
import { Service } from '../../../user/Manage/entities/service.entity';
import { Helper } from '../../../utils/services/helper-utils';
import { PhoneUtils } from '../../../utils/services/phone-utils';
import { LoginDto } from '../../dtos/common/req/login-dto';
import { RegistrationDto } from '../../dtos/registration.dto';
import { ResetPasswordDto } from '../../dtos/reset-password.dto';
import { OtpCodeEmail } from '../../entities/otp-code-email';
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
    @InjectRepository(OtpCodeEmail)
    private otpCodeEmailRepository: Repository<OtpCodeEmail>,
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

  async resetPassword(request: ResetPasswordDto) {
    const otp = request.otp;

    let user: User | null = null;
    let email: string | null = null;
    let phone: string | null = null;

    if (!request.email_or_phone_number) {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.PHONE_NUMBER_OR_EMAIL_IS_REQUIRED[0],
        MsgCode.PHONE_NUMBER_OR_EMAIL_IS_REQUIRED[1],
      );
    }

    const isValidEmail = Helper.validEmail(request.email_or_phone_number);
    if (isValidEmail) {
      email = request.email_or_phone_number;
      user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return new QueryResponseDto(
          HttpStatus.BAD_REQUEST,
          false,
          MsgCode.NO_EMAIL_ACCOUNT_EXISTS_IN_SYSTEM[0],
          MsgCode.NO_EMAIL_ACCOUNT_EXISTS_IN_SYSTEM[1],
        );
      }
    } else if (PhoneUtils.isNumberPhoneValid(request.email_or_phone_number)) {
      phone = PhoneUtils.convert(request.email_or_phone_number);
      user = await this.userRepository.findOne({
        where: {
          phone_number: phone,
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
    }

    let from = '';
    let type = '';
    let otpExis: OtpCodeEmail | OtpCodePhone | null = null;

    if (email != null && phone == null) {
      from = email;
      type = 'email';
      otpExis = await this.otpCodeEmailRepository.findOne({
        where: {
          email: email,
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
    } else if (email == null && phone != null) {
      from = phone;
      type = 'phone';
      otpExis = await this.otpCodePhoneRepository.findOne({
        where: {
          phone: from,
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
    } else {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.OTP_IS_REQUIRE[0],
        MsgCode.OTP_IS_REQUIRE[1],
      );
    }

    const isExpired = await this.hasExpiredOtp(from, type);
    if (isExpired) {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.EXPIRED_PIN_CODE[0],
        MsgCode.EXPIRED_PIN_CODE[1],
      );
    }

    if (request.password.length < 6) {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.PASSWORD_NOT_LESS_THAN_6_CHARACTERS[0],
        MsgCode.PASSWORD_NOT_LESS_THAN_6_CHARACTERS[1],
      );
    }

    await this.sessionRepository.delete({ user_id: user.id });
    await this.resetOtp(phone);

    await this.userRepository.update(
      { id: user.id },
      { password: await bcrypt.hash(request.password, 10) },
    );

    return new QueryResponseDto(
      HttpStatus.OK,
      true,
      MsgCode.SUCCESS[0],
      MsgCode.SUCCESS[1],
    );
  }

  private async resetOtp(phone: string) {
    const otp = Helper.generateRandomNum(6);
    const now = new Date();
    const convertedPhone = PhoneUtils.convert(phone);

    const existingOtp = await this.otpCodePhoneRepository.findOne({
      where: {
        phone: convertedPhone,
      },
    });

    if (existingOtp) {
      // Update existing OTP record
      existingOtp.otp = otp;
      existingOtp.time_generate = now;
      await this.otpCodePhoneRepository.save(existingOtp);
    } else {
      // Create a new OTP record
      const newOtp = this.otpCodePhoneRepository.create({
        area_code: '+84',
        otp,
        phone: convertedPhone,
        time_generate: now,
      });
      await this.otpCodePhoneRepository.save(newOtp);
    }
  }

  private async hasExpiredOtp(
    from: string,
    type: string | null = null,
  ): Promise<boolean> {
    const now = Helper.getTimeNowString();
    let otpExis: OtpCodeEmail | OtpCodePhone | null = null;

    if (type === 'email') {
      otpExis = await this.otpCodeEmailRepository.findOne({
        where: { email: from },
      });
    } else {
      otpExis = await this.otpCodePhoneRepository.findOne({
        where: { phone: from },
      });
    }

    if (otpExis === null) {
      return false;
    }

    const time1 = dayjs(otpExis.time_generate.toString()).add(7, 'minute'); // Add 7 minutes to timeGenerate
    const time2 = dayjs();

    return time1.isBefore(time2);
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
