import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoPost } from '../home/entity/mo-post.entity';
import { CreateReservationMotelDto } from './dtos/reservation-motel-create.dto';
import { ReservationMotelUpdateDto } from './dtos/reservation-motel-update.dto';
import { ReservationMotel } from './entity/reservation-motel.entity';

@Injectable()
export class ReservationMotelService {
  constructor(
    @InjectRepository(ReservationMotel)
    private reservationMotelRepository: Repository<ReservationMotel>,
    @InjectRepository(MoPost)
    private readonly moPostRepository: Repository<MoPost>,
  ) {}

  async getAll(userId: number, status: number, limit: number) {
    if (limit == null || limit == undefined) {
      limit = 20;
    }

    let queryBuilder = this.reservationMotelRepository
      .createQueryBuilder('reservation_motels')
      .orderBy('reservation_motels.created_at', 'DESC');

    if (userId) {
      queryBuilder.where('reservation_motels.user_id = :userId', { userId });
    }

    if (status) {
      queryBuilder.andWhere('reservation_motels.status = :status', { status });
    }

    queryBuilder = queryBuilder.limit(limit || 20);
    const data = await queryBuilder.getMany();
    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: data,
    };
  }

  async createReservationMotel(request: CreateReservationMotelDto) {
    const moPostExist = await this.moPostRepository.findOne({
      where: { id: request.mo_post_id },
    });

    if (!moPostExist) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_MOTEL_EXISTS',
        msg: 'Phòng trọ không tồn tại',
      };
    }

    if (!request.name) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NAME_IS_REQUIRED',
        msg: 'Tên không được trống',
      };
    }

    if (!request.phone_number) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'PHONE_NUMBER_IS_REQUIRED',
        msg: 'Số điện thoại không được để trống',
      };
    }

    const reservationData: any = {
      mo_post_id: request.mo_post_id,
      host_id: request.host_id,
      user_id: request.user_id ? request.user_id : null,
      name: request.name,
      phone_number: request.phone_number,
      status: 'NOT_CONSULT', // Define status as needed
      province: request.province,
      district: request.district,
      wards: request.wards,
      note: request.note,
      province_name: request.province, // Define Place functions as needed
      district_name: request.district,
      wards_name: request.wards,
      address_detail: request.address_detail,
    };

    const created = await this.reservationMotelRepository.create(
      reservationData,
    );
    await this.reservationMotelRepository.save(created);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: created,
    };
  }

  async update(
    updateReservationDto: ReservationMotelUpdateDto,
    reservationMotelId: number,
  ) {
    const reservationMotelExist: ReservationMotel =
      await this.reservationMotelRepository.findOne({
        where: {
          id: reservationMotelId,
          user_id: updateReservationDto.user_id,
        },
      });

    if (!reservationMotelExist) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_RESERVATION_MOTEL_EXISTS',
        msg: 'Bản ghi giữ chỗ không tồn tại',
      };
    }

    if (reservationMotelExist.status === 2) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'RESERVATION_MOTEL_HAS_CONSULTED',
        msg: 'Bản đăng kí giữ chỗ đã được tư vấn',
      };
    }

    // Update the reservation data
    const updatedReservation = await this.reservationMotelRepository.update(
      reservationMotelExist.id,
      {
        name: updateReservationDto.name ?? updateReservationDto.name,
        host_id: updateReservationDto.host_id ?? updateReservationDto.host_id,
        mo_post_id:
          updateReservationDto.mo_post_id ?? reservationMotelExist.mo_post_id,
        phone_number:
          updateReservationDto.phone_number ??
          reservationMotelExist.phone_number,
        status: 2,
        province:
          updateReservationDto.province ?? reservationMotelExist.province,
        district:
          updateReservationDto.district ?? reservationMotelExist.district,
        wards: updateReservationDto.wards ?? reservationMotelExist.wards,
        note: updateReservationDto.note ?? reservationMotelExist.note,
        province_name: updateReservationDto.province
          ? updateReservationDto.province.toString()
          : reservationMotelExist.province_name,
        district_name: updateReservationDto.district
          ? updateReservationDto.district.toString()
          : reservationMotelExist.district_name,
        wards_name: updateReservationDto.wards
          ? updateReservationDto.wards.toString()
          : reservationMotelExist.wards_name,
        address_detail:
          updateReservationDto.address_detail ??
          reservationMotelExist.address_detail,
      },
    );

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: updatedReservation,
    };
  }

  async getOne(user_id: number, reservationMotelId: number) {
    const reservationMotelExist = await this.reservationMotelRepository.findOne(
      {
        where: { id: reservationMotelId, user_id: user_id },
      },
    );

    if (!reservationMotelExist) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_RESERVATION_MOTEL_EXISTS',
        msg: 'Bản ghi giữ chỗ không tồn tại',
      };
    }

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: reservationMotelExist,
    };
  }

  async deleteReservationMotel(user_id: number, reservationMotelId: number) {
    const reservationMotelExist = await this.reservationMotelRepository.findOne(
      {
        where: { id: reservationMotelId, user_id: user_id },
      },
    );

    if (!reservationMotelExist) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_RESERVATION_MOTEL_EXISTS',
        msg: 'Bản ghi giữ chỗ không tồn tại',
      };
    }

    const idDeleted = reservationMotelExist.id;
    await this.reservationMotelRepository.delete(reservationMotelId);

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: { idDeleted },
    };
  }
}
