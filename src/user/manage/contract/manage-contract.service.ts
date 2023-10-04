// service.service.ts
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../community/contract/entities/contract.entity';
import { GetAllContractsRequest } from './dto/get-all-contract.dto';

@Injectable()
export class ManageContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  public async getAll(request: GetAllContractsRequest) {
    let query = this.contractRepository.createQueryBuilder('contract');

    if (request.contract_status) {
      if (request.contract_status === 'progressing') {
        query = query.andWhere('contract.status IN (:...statuses)', {
          statuses: ['progressing', 'waiting_confirm'],
        });
        query = query.addOrderBy(
          'contract.status',
          request.descending ? 'ASC' : 'DESC',
        );
      } else {
        query = query.andWhere('contract.status = :status', {
          status: request.contract_status,
        });
      }
    }

    if (request.money_from && typeof request.money_from === 'number') {
      query = query.andWhere(
        'contract.' + (request.type_money || 'money') + ' >= :moneyFrom',
        {
          moneyFrom: request.money_from,
        },
      );
    }

    if (request.money_to && typeof request.money_to === 'number') {
      query = query.andWhere(
        'contract.' + (request.type_money || 'money') + ' <= :moneyTo',
        {
          moneyTo: request.money_to,
        },
      );
    }

    if (request.date_from) {
      query = query.andWhere('contract.created_at >= :dateFrom', {
        dateFrom: new Date(request.date_from),
      });
    }

    if (request.date_to) {
      query = query.andWhere('contract.created_at <= :dateTo', {
        dateTo: new Date(request.date_to),
      });
    }

    if (request.search) {
      query = query
        .leftJoinAndMapOne(
          'contract.renters',
          'contract.renter_phone_number',
          'renters',
          'renters.phone_number LIKE :search OR renters.name LIKE :search',
          {
            search: `%${request.search}%`,
          },
        )
        .leftJoinAndMapOne(
          'contract.motels',
          'contract.motel_id',
          'motels',
          'motels.motel_name LIKE :search',
          {
            search: `%${request.search}%`,
          },
        );
    }

    if (request.sort_by) {
      const sort_by = 'contract.' + request.sort_by;
      query = query.addOrderBy(sort_by, request.descending ? 'DESC' : 'ASC');
    }

    const contracts = await query
      .distinct(true)
      .skip((request.page || 1) * (request.limit || 20))
      .take(request.limit || 20)
      .getMany();

    return {
      code: HttpStatus.OK,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: contracts,
    };
  }
  catch(error) {
    throw new Error('Error while fetching contracts: ' + error.message);
  }
}
