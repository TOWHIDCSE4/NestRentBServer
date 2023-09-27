// service.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from '../../dtos/create.service.dto';
import { Service } from '../../entities/service.entity';
import { ServiceRepository } from '../../repositories/service.repository';

@Injectable()
export class ServiceManageService {
  constructor(private serviceRepository: ServiceRepository) {}

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
