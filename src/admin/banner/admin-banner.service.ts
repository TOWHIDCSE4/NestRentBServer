import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
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

  async create(createBannerDto: CreateBannerDto): Promise<DBAdminBanner> {
    const { image_url, title, action_link } = createBannerDto;

    const newBanner = this.bannerRepository.create({
      image_url,
      title,
      action_link,
    });

    return await this.bannerRepository.save(newBanner);
  }
}
