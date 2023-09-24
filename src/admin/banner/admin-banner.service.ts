import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DBAdminBanner } from './entity/admin-banner.entity';

@Injectable()
export class AdminBannerService {
  constructor(
    @InjectRepository(DBAdminBanner)
    private bannerRepository: Repository<DBAdminBanner>,
  ) {}

  async getAll() {
    const banners = await this.bannerRepository.find({});
    return banners;
  }

  async getById(bannerId: number) {
    const banner = await this.bannerRepository.findOne({
      where: {
        id: bannerId,
      },
    });
    return banner;
  }
}
