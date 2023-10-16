import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRenterDto } from '../dtos/create.renter.dto';
import { UpdateRenterDto } from '../dtos/update.renter.dto';
import { Renter } from '../entities/renter.entity';
import { RenterRepository } from '../repositories/renter.repository';

@Injectable()
export class RenterService {
  constructor(private renterRepository: RenterRepository) {}

  async createRenter(createRenterDto: CreateRenterDto): Promise<Renter> {
    try {
      const renter = this.renterRepository.create(createRenterDto);
      return await this.renterRepository.save(renter);
    } catch (error) {
      throw new Error('Error creating renter: ' + error.message);
    }
  }

  async getAll(): Promise<Renter[]> {
    return this.renterRepository.find({});
  }

  async getByServiceId(renterId: number): Promise<Renter> {
    try {
      const service = await this.renterRepository.findOneById(renterId);
      if (service == null)
        throw new NotFoundException(`Service with ID ${renterId} not found`);
      return service;
    } catch (error) {
      throw new NotFoundException(`Service with ID ${renterId} not found`);
    }
  }

  async deleteByid(renterId: number): Promise<Renter> {
    try {
      const service = await this.renterRepository.findOneById(renterId);
      if (service === null)
        throw new NotFoundException(
          `Cart Service with ID ${renterId} not found`,
        );
      await this.renterRepository.remove(service);
      return service;
    } catch (error) {
      throw new NotFoundException(`Cart Service with ID ${renterId} not found`);
    }
  }

  async update(id: number, updateRenter: UpdateRenterDto): Promise<Renter> {
    const renter = await this.renterRepository.findOne({
      where: { id: id },
    });

    if (!renter) {
      throw new NotFoundException(` renter with ID ${id} not found`);
    }

    renter.address = updateRenter.address;
    renter.cmndBackImageUrl = updateRenter.cmndBackImageUrl;
    renter.cmndFrontImageUrl = updateRenter.cmndFrontImageUrl;
    renter.cmndNumber = updateRenter.cmndNumber;
    renter.dateOfBirth = updateRenter.dateOfBirth;
    renter.dateRange = updateRenter.dateRange;
    renter.depositExpected = updateRenter.depositExpected;
    renter.email = updateRenter.email;
    renter.estimateRentalDate = updateRenter.estimateRentalDate;
    renter.estimateRentalPeriod = updateRenter.estimateRentalPeriod;
    renter.hasContract = updateRenter.hasContract;
    renter.imageUrl = updateRenter.imageUrl;
    renter.isHidden = updateRenter.isHidden;
    renter.job = updateRenter.job;
    renter.motelId = updateRenter.motelId;
    renter.motelName = updateRenter.motelName;
    renter.name = updateRenter.name;
    renter.nameMotelExpected = updateRenter.nameMotelExpected;
    renter.nameTowerExpected = updateRenter.nameTowerExpected;
    renter.type = updateRenter.type;
    renter.typeFrom = updateRenter.typeFrom;
    renter.sex = updateRenter.sex;
    renter.phoneNumber = updateRenter.phoneNumber;
    renter.priceExpected = updateRenter.priceExpected;

    await this.renterRepository.update(id, renter);

    return renter;
  }
}
