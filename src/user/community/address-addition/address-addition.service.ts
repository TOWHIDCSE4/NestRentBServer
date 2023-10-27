import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressAdditionDto } from './dto/address-addition-create.dto';
import { AddressAdditionGetQueryDto } from './dto/address-addition-get.dto';
import { AddressAddition } from './entity/address-addition.entity';

@Injectable()
export class AddressAdditionService {
  constructor(
    @InjectRepository(AddressAddition)
    private addressAditionRepository: Repository<AddressAddition>,
  ) {}

  async getAll(queryDto: AddressAdditionGetQueryDto) {
    const sortBy = queryDto.sort_by || 'created_at';
    const limit = queryDto.limit || 20;
    const descending = queryDto.descending || true;

    if (limit < 0 || limit > 600) {
      return {
        code: 400,
        success: false,
        msg_code: 'INVALID_LIMIT_REQUEST',
        msg: 'Số lượng bản ghi được lấy không hợp lệ',
      };
    }

    const filters = {
      user_id: queryDto.user_id,
      province: queryDto.province,
      district: queryDto.district,
      wards: queryDto.wards,
    };

    const query = this.addressAditionRepository
      .createQueryBuilder('address_additions')
      .where('address_additions.user_id = :user_id', {
        user_id: filters.user_id,
      });

    if (filters.province) {
      query.andWhere('address_additions.province = :province', {
        province: filters.province,
      });
    }

    if (filters.district) {
      query.andWhere('address_additions.district = :district', {
        district: filters.district,
      });
    }

    if (filters.wards) {
      query.andWhere('address_additions.wards = :wards', {
        wards: filters.wards,
      });
    }

    query.orderBy(`address_additions.${sortBy}`, descending ? 'DESC' : 'ASC');
    query.limit(limit);

    const data = await query.getMany();

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: data,
    };
  }

  async create(request: CreateAddressAdditionDto) {
    const exist = await this.addressAditionRepository.findOne({
      where: {
        user_id: request.user_id,
        province: request.province,
        district: request.district,
        wards: request.wards,
        address_detail: request.address_detail,
      },
    });

    if (exist) {
      return {
        code: 400,
        success: false,
        msg_code: 'ADDRESS_ADDITION_EXISTS',
        msg: 'Địa chỉ bổ sung đã tồn tại',
      };
    }

    const addressAddtion = new AddressAddition();
    addressAddtion.user_id = request.user_id;
    addressAddtion.province = request.province;
    addressAddtion.district = request.district;
    addressAddtion.wards = request.wards;
    addressAddtion.address_detail = request.address_detail;
    addressAddtion.note = request.note;
    const res = await this.addressAditionRepository.save(addressAddtion);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: res,
    };
  }

  async update(
    addressAdditionUpdateDto: CreateAddressAdditionDto,
    addressAdditionId: number,
  ) {
    const exist = await this.addressAditionRepository.findOne({
      where: {
        id: addressAdditionId,
      },
    });

    if (exist == null) {
      return {
        code: 400,
        success: false,
        msg_code: 'NO_ADDRESS_ADDITION_EXISTS',
        msg: 'Địa chỉ bổ sung không tồn tại',
      };
    }

    const existUp = await this.addressAditionRepository.findOne({
      where: {
        id: addressAdditionId,
        province: addressAdditionUpdateDto.province,
        district: addressAdditionUpdateDto.district,
        wards: addressAdditionUpdateDto.wards,
        address_detail: addressAdditionUpdateDto.address_detail,
      },
    });

    if (existUp) {
      return {
        code: 400,
        success: false,
        msg_code: 'ADDRESS_ADDITION_EXISTS',
        msg: 'Địa chỉ bổ sung đã tồn tại',
      };
    }

    const updated = await this.addressAditionRepository.update(
      addressAdditionId,
      {
        province: addressAdditionUpdateDto.province,
        district: addressAdditionUpdateDto.district,
        wards: addressAdditionUpdateDto.wards,
        address_detail: addressAdditionUpdateDto.address_detail,
        note: addressAdditionUpdateDto.note,
      },
    );

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: updated,
    };
  }

  async getOne(addressAdditionId: number) {
    const exist = await this.addressAditionRepository.findOne({
      where: {
        id: addressAdditionId,
      },
    });

    if (exist == null) {
      return {
        code: 400,
        success: false,
        msg_code: 'NO_ADDRESS_ADDITION_EXISTS',
        msg: 'Địa chỉ bổ sung không tồn tại',
      };
    }

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: exist,
    };
  }

  async delete(addressAdditionId: number) {
    const exist = await this.addressAditionRepository.findOne({
      where: {
        id: addressAdditionId,
      },
    });

    if (exist == null) {
      return {
        code: 400,
        success: false,
        msg_code: 'NO_ADDRESS_ADDITION_EXISTS',
        msg: 'Địa chỉ bổ sung không tồn tại',
      };
    }

    const idDeleted = addressAdditionId;
    await this.addressAditionRepository.delete(addressAdditionId);

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: { idDeleted },
    };
  }
}
