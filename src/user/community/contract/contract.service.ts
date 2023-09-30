import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractQueryDto } from './dtos/contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async getAllContracts(queryDto: ContractQueryDto): Promise<Contract[]> {
    const { limit, sortBy, dateFrom, dateTo, fromMoney, toMoney, typeMoney, contractStatus, descending, search } = queryDto;

    const query = await this.contractRepository.createQueryBuilder('contract');

    // Apply filters based on queryDto
    if (dateFrom) {
      query.where('contract.created_at >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      query.andWhere('contract.created_at <= :dateTo', { dateTo });
    }

    if (fromMoney && typeMoney) {
      query.andWhere(`contract.${typeMoney} >= :fromMoney`, { fromMoney });
    }

    if (toMoney && typeMoney) {
      query.andWhere(`contract.${typeMoney} <= :toMoney`, { toMoney });
    }

    if (contractStatus) {
      if (contractStatus === 0) {
        query.andWhere('contract.status IN (:...statuses)', {
          statuses: [0, 3],
        });
      } else {
        query.andWhere('contract.status = :contractStatus', { contractStatus });
      }
    }

    // Handle sorting
    if (sortBy) {
      const sortOrder = descending ? 'DESC' : 'ASC';
      query.orderBy(`contract.${sortBy}`, sortOrder);
    }

    // Handle search
    if (search) {
      query.innerJoin('contract.user', 'user').innerJoin('contract.motel', 'motel');
      query.where('(user.phone_number LIKE :search OR motel.phone_number LIKE :search OR motel.motel_name LIKE :search)', {
        search: `%${search}%`,
      });
    }

    // Apply pagination
    if (limit) {
      query.limit(limit);
    }

    // Execute the query
    return query.getMany();
  }

  async getContractById(id: number, renterPhoneNumber: string): Promise<Contract> {
    const contract = await this.contractRepository
      .createQueryBuilder('contract')
      .innerJoin('contract.userContracts', 'userContract')
      .where('contract.id = :id', { id })
      .andWhere('userContract.renterPhoneNumber = :renterPhoneNumber', {
        renterPhoneNumber,
      })
      .getOne();

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return contract;
  }

}
