// commission.service.ts
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommissionDto } from './dto/commision.dto';
import { UpdateCommissionDto } from './dto/update-commision.dto';
import { CollaboratorReferMotel } from './entity/collaborator-refer-motels.entity';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(CollaboratorReferMotel)
    private readonly commissionRepository: Repository<CollaboratorReferMotel>,
  ) {}

  async getAllCommission(query: CommissionDto) {
    const { date_from, date_to, limit, sort_by, descending, status, search } =
      query;

    let dateFrom: Date | null = null;
    let dateTo: Date | null = null;

    // Validate and format date_from and date_to
    if (date_from || date_to) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (
        date_from == null ||
        date_from == undefined ||
        !datePattern.test(date_from)
      ) {
        return {
          code: 400,
          success: false,
          msg_code: 'INVALID_DATETIME_QUERY',
          msg: 'Invalid datetime query',
        };
      }
      dateFrom = new Date(date_from);
      dateFrom.setHours(0, 0, 1);

      if (
        date_to == null ||
        date_to == undefined ||
        !datePattern.test(date_to)
      ) {
        return {
          code: 400,
          success: false,
          msg_code: 'INVALID_DATETIME_QUERY',
          msg: 'Invalid datetime query',
        };
      }
      dateTo = new Date(date_to);
      dateTo.setHours(23, 59, 59);
    }

    // Define your TypeORM query conditions based on the provided parameters
    const queryConditions: any = {};

    if (status) {
      queryConditions.status = status;
    }

    if (dateFrom) {
      queryConditions.date_refer_success = dateFrom.toISOString();
    }

    if (dateTo) {
      queryConditions.date_refer_success = dateTo.toISOString();
    }

    if (search) {
      queryConditions.description = (qb) => {
        qb.where('description LIKE :search', { search: `%${search}%` });
      };
    }

    // Sort and paginate your query
    const queryBuilder = this.commissionRepository.createQueryBuilder(
      'collaborator_refer_motels',
    );
    queryBuilder.where(queryConditions);

    if (sort_by) {
      queryBuilder.orderBy(sort_by, descending ? 'DESC' : 'ASC');
    }

    if (limit) {
      queryBuilder.limit(limit);
    }

    const listCollaboratorReferMotel = await queryBuilder.getMany();

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: listCollaboratorReferMotel,
    };
  }

  public async getOne(commissionCollaboratorId: number) {
    const commision = await this.commissionRepository.findOne({
      where: {
        id: commissionCollaboratorId,
      },
    });

    if (commision == null) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_MOTEL_EXISTS',
        msg: 'Phòng trọ không tồn tại',
      };
    }

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: commision,
    };
  }

  public async update(id: number, updateCommissionDto: UpdateCommissionDto) {
    const commision = await this.commissionRepository.findOne({
      where: {
        id: id,
      },
    });

    if (commision == null) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_COLLABORATOR_EXISTS',
        msg: 'Cộng tác viên không tồn tại',
      };
    }

    if (commision.status == 1) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'COLLABORATOR_COMMISSION_COMPLETED',
        msg: 'hoa hồng cộng tác viên đã hoàn tất',
      };
    }

    if (commision.status == 2) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'COLLABORATOR_COMMISSION_CANCEL',
        msg: 'hoa hồng cộng tác viên đã bị hủy',
      };
    }

    if (commision.status == 3) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'COLLABORATOR_COMMISSION_WAIT_CONFIRM',
        msg: 'hoa hồng cộng tác viên đã thanh thoán và chờ duyệt',
      };
    }

    const updated = await this.commissionRepository.update(commision.id, {
      status: updateCommissionDto.status,
      images_host_paid: updateCommissionDto.images_host_paid.toString(),
    });

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: updated,
    };
  }
}
