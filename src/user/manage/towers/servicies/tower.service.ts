import { Injectable, NotFoundException } from '@nestjs/common';
import { Tower } from '../entities/tower.entity';
import { TowerRepository } from '../repositories/tower.repo';

@Injectable()
export class TowerService {
  constructor(private towerRepository: TowerRepository) {}

  async getBytowerId(towerId: number): Promise<Tower> {
    try {
      const service = await this.towerRepository.findOneById(towerId);
      if (service == null)
        throw new NotFoundException(`Tower with ID ${towerId} not found`);
      return service;
    } catch (error) {
      throw new NotFoundException(`tower with ID ${towerId} not found`);
    }
  }

  async getAllByUserId(userId: number): Promise<Tower[]> {
    return this.towerRepository.find({ where: { userId: userId } });
  }

  async deleteByid(towerId: number): Promise<Tower> {
    try {
      const tower = await this.towerRepository.findOneById(towerId);
      if (tower === null)
        throw new NotFoundException(`Tower with ID ${towerId} not found`);
      await this.towerRepository.remove(tower);
      return tower;
    } catch (error) {
      throw new NotFoundException(`Tower with ID ${towerId} not found`);
    }
  }

  async getAll(): Promise<Tower[]> {
    return this.towerRepository.find({});
  }
}
