import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
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

  async update(
    id: number,
    updateBannerDto: UpdateBannerDto,
  ): Promise<DBAdminBanner> {
    const bannerExist = await this.bannerRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!bannerExist) {
      throw new NotFoundException('No banner exists with the given ID');
    }

    // Update the banner properties if they exist in the DTO, otherwise keep the existing values
    if (updateBannerDto.image_url !== undefined) {
      bannerExist.image_url = updateBannerDto.image_url;
    }
    if (updateBannerDto.title !== undefined) {
      bannerExist.title = updateBannerDto.title;
    }
    if (updateBannerDto.action_link !== undefined) {
      bannerExist.action_link = updateBannerDto.action_link;
    }

    return this.bannerRepository.save(bannerExist);
  }

  async deleteByIds(ids: number[]): Promise<number[]> {
    const IdDeleted: number[] = [];

    for (const bannerId of ids) {
      const existBanner = await this.bannerRepository.findOne({
        where: {
          id: bannerId,
        },
      });
      if (existBanner) {
        IdDeleted.push(existBanner.id);
        await this.bannerRepository.remove(existBanner);
      }
    }
    return IdDeleted;
  }
}
