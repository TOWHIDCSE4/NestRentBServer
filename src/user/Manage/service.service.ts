// service.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create.service.dto';
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

  async getByServiceId(serviceId: number): Promise<Service> {
    try {
      const service = await this.serviceRepository.findOneById(serviceId);
      return service;
    } catch (error) {
      throw new NotFoundException(`Service with ID ${serviceId} not found`);
    }
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async getAll(): Promise<Service[]> {
    return this.serviceRepository.find({});
  }
  // Add other service methods as needed
}
