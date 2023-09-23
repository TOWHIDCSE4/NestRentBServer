// service.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async getAllByUserId(userId: number): Promise<Service[]> {
    return this.serviceRepository.find({ where: { user_id: userId } });
  }

  // Add other service methods as needed
}
