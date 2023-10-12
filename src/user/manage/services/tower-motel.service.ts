import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MsgCode } from '../../../shared/constants/message.constants';
import { Motel } from '../../community/contract/entities/motel.entity';
import { CreateTowerMotelDto } from '../dtos/create.tower-motel.dto';
import { UpdateTowerMotelDto } from '../dtos/update-tower-motel.dto';
import { TowerMotel } from '../entities/tower-motel.entity';
import { Tower } from '../towers/entities/tower.entity';

@Injectable()
export class TowerMotelService {
  constructor(
    @InjectRepository(Tower)
    private towerRepository: Repository<Tower>,
    @InjectRepository(Motel)
    private motelRepository: Repository<Motel>,
    @InjectRepository(TowerMotel)
    private towerMotelRepository: Repository<TowerMotel>,
  ) {}

  async create(createTowerMotelDto: CreateTowerMotelDto) {
    const now = new Date();
    const { towerId, listMotelId, userId } = createTowerMotelDto;

    const towerExists = await this.towerRepository.findOne({
      where: {
        id: towerId,
        userId: userId,
      },
    });

    if (!towerExists) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_MOTEL_EXISTS',
        msg: 'Phòng trọ không tồn tại',
      };
    }

    if (!listMotelId || !Array.isArray(listMotelId)) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'INVALID_LIST_MOTEL_ID',
        msg: 'Danh sách mã phòng không hợp lệ',
      };
    }

    const validMotelCount = await this.motelRepository.count({
      where: {
        id: In(listMotelId),
      },
    });

    if (validMotelCount !== listMotelId.length) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'INVALID_LIST_MOTEL_ID',
        msg: 'Danh sách mã phòng không hợp lệ',
      };
    }

    // Create TowerMotel entities
    const towerMotelTemp = listMotelId.map((motelId) => ({
      towerId: towerExists.id,
      motelId,
      isRoomHidden: 0,
      status: 0,
      createdAt: now,
      updatedAt: now,
    }));

    if (towerMotelTemp.length > 0) {
      // Delete existing TowerMotel records
      await this.towerMotelRepository.delete({ tower_id: towerExists.id });
      // Insert new TowerMotel records
      await this.towerMotelRepository.insert(towerMotelTemp);
    }

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: MsgCode.SUCCESS[0],
      msg: MsgCode.SUCCESS[1],
    };
  }

  async update(updateTowerMotelDto: UpdateTowerMotelDto) {
    const towerMotel = await this.towerMotelRepository.findOne({
      where: {
        id: updateTowerMotelDto.tower_id,
      },
    });

    if (!towerMotel) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_CATEGORY_SERVICE_SELL_EXISTS',
        msg: 'Không tồn tại danh mục bán dịch vụ',
      };
    }

    if (updateTowerMotelDto.status !== undefined) {
      towerMotel.status = updateTowerMotelDto.status;
    }
    await this.towerMotelRepository.save(towerMotel);

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: MsgCode.SUCCESS[0],
      msg: MsgCode.SUCCESS[1],
      data: towerMotel,
    };
  }

  async getAll(tower_id: number) {
    if (tower_id == null || tower_id == undefined) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_TOWER_EXISTS',
        msg: 'Tòa nhà không tồn tại',
      };
    }

    const towerMotels = await this.towerMotelRepository.find({
      where: {
        tower_id: tower_id,
      },
      take: 20,
    });

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: MsgCode.SUCCESS[0],
      msg: MsgCode.SUCCESS[1],
      data: towerMotels,
    };
  }

  async delete(deleteMotelId: number) {
    const towerMotel = await this.towerMotelRepository.findOne({
      where: {
        id: deleteMotelId,
      },
    });

    if (towerMotel == null) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_TOWER_MOTEL_ID_EXISTS',
        msg: 'Phòng trọ trong tòa nhà không tồn tại',
      };
    }

    await this.towerMotelRepository.delete(deleteMotelId);

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: MsgCode.SUCCESS[0],
      msg: MsgCode.SUCCESS[1],
      data: towerMotel,
    };
  }
}
