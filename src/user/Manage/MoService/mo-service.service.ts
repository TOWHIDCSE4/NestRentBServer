// src/mo-services/mo-service.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMoServiceDto } from './dtos/UpdateMoServiceDto';
import { MoService } from './entity/mo-service';

@Injectable()
export class MoServiceService {
  constructor(
    @InjectRepository(MoService)
    private readonly moServiceRepository: Repository<MoService>,
  ) {}

  async update(
    id: number,
    updateMoServiceDto: UpdateMoServiceDto,
  ): Promise<MoService> {
    const moServiceExist = await this.moServiceRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!moServiceExist) {
      throw new NotFoundException(`Mo Service with ID ${id} not found`);
    }

    if (updateMoServiceDto.image_url !== undefined) {
      moServiceExist.images = updateMoServiceDto.image_url;
    }

    if (updateMoServiceDto.service_name !== undefined) {
      moServiceExist.service_name = updateMoServiceDto.service_name;
    }
    if (updateMoServiceDto.service_icon !== undefined) {
      moServiceExist.service_icon = updateMoServiceDto.service_icon;
    }
    moServiceExist.service_charge = updateMoServiceDto.service_charge;
    moServiceExist.motel_id = updateMoServiceDto.motel_id;
    moServiceExist.note = updateMoServiceDto.note;
    moServiceExist.service_unit = updateMoServiceDto.service_unit;
    moServiceExist.type_unit = updateMoServiceDto.type_unit;
    return this.moServiceRepository.save(moServiceExist);
  }

  async getByMoServiceId(moServiceId: number): Promise<MoService> {
    try {
      const service = await this.moServiceRepository.findOneById(moServiceId);
      if (service === null)
        throw new NotFoundException(
          `Mo Service with ID ${moServiceId} not found`,
        );
      return service;
    } catch (error) {
      throw new NotFoundException(`Error in getting the service`);
    }
  }
}
