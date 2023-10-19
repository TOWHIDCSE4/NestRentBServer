// service.service.ts
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DBAdminBanner } from '../../../../admin/banner/entity/admin-banner.entity';
import { CategoryServiceSells } from '../../../../service-sell/entities/category-service-sells.entity';
import { ServiceSells } from '../../../../service-sell/entities/service-sell.entity';
import { Motel } from '../../contract/entities/motel.entity';
import { AdminContact } from '../entity/admin-contracts.entity';
import { AdminDiscoverItemUi } from '../entity/admin-discover-item-ui.entity';
import { AdminDiscoverUi } from '../entity/admin-discover-ui.entity';
import { ConfigAdmin } from '../entity/config-admin.entity';
import { MoPostFindMotel } from '../entity/mo-post-find-motels.entity';
import { MoPostRoommate } from '../entity/mo-post-roommate.entity';
import { MoPost } from '../entity/mo-post.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(ConfigAdmin)
    private configRepo: Repository<ConfigAdmin>,
    @InjectRepository(AdminDiscoverUi)
    private adminDiscoverUiRepo: Repository<AdminDiscoverUi>,
    @InjectRepository(AdminDiscoverItemUi)
    private adminDiscoverItemUiRepo: Repository<AdminDiscoverItemUi>,
    @InjectRepository(Motel)
    private motelRepo: Repository<Motel>,
    @InjectRepository(MoPost)
    private moPostRepository: Repository<MoPost>,
    @InjectRepository(MoPostFindMotel)
    private moPostFindMotelRepository: Repository<MoPostFindMotel>,
    @InjectRepository(MoPostRoommate)
    private moPostRoommateRepository: Repository<MoPostRoommate>,
    @InjectRepository(DBAdminBanner)
    private adminBannerRepository: Repository<DBAdminBanner>,
    @InjectRepository(ServiceSells)
    private serviceSellRepository: Repository<ServiceSells>,
    @InjectRepository(CategoryServiceSells)
    private categoryServiceSellRepository: Repository<CategoryServiceSells>,
    @InjectRepository(AdminContact)
    private adminContactRepository: Repository<AdminContact>,
  ) {}

  async introApp() {
    const configs = await this.configRepo.find({});
    let res = configs.length > 0 ? configs[0]?.intro_app : '1.0.0';
    if (res == null || res == undefined) res = '1.0.0';
    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: res,
    };
  }

  async homeService(province: string, district: string, limit: number) {
    if (limit == undefined || limit == null) limit = 20;
    const outstandingMoPost = await this.moPostRepository
      .createQueryBuilder('mo_posts')
      .where('mo_posts.status = :status', { status: 2 })
      .orderBy('mo_posts.created_at', 'DESC')
      .take(limit)
      .getMany();

    const newMoPost = await this.moPostRepository
      .createQueryBuilder('mo_posts')
      .where('mo_posts.status = :status', { status: 2 })
      .orderBy('mo_posts.created_at', 'DESC')
      .andWhere((qb) => {
        qb.where('mo_posts.province = :province', { province }).orWhere(
          'mo_posts.district = :district',
          { district },
        );
      })
      .take(limit)
      .getMany();

    const moPostFindMotels = await this.moPostFindMotelRepository
      .createQueryBuilder('mo_post_find_motel')
      .where('mo_post_find_motel.status = :status', { status: 2 })
      .orderBy('mo_post_find_motel.created_at', 'DESC')
      .andWhere((qb) => {
        qb.where('mo_post_find_motel.province = :province', {
          province,
        }).orWhere('mo_post_find_motel.district = :district', { district });
      })
      .take(limit)
      .getMany();

    const moPostFindRoommates = await this.moPostRoommateRepository
      .createQueryBuilder('mo_post_roommate')
      .where('mo_post_roommate.status = :status', { status: 2 })
      .orderBy('mo_post_roommate.created_at', 'DESC')
      .andWhere((qb) => {
        qb.where('mo_post_roommate.province = :province', { province }).orWhere(
          'mo_post_roommate.district = :district',
          { district },
        );
      })
      .take(limit)
      .getMany();

    const banners = await this.adminBannerRepository
      .createQueryBuilder('admin_banners')
      .select([
        'admin_banners.image_url',
        'admin_banners.title',
        'admin_banners.action_link',
      ])
      .orderBy('admin_banners.created_at', 'DESC')
      .take(limit)
      .getRawMany();

    const adminContacts = await this.adminContactRepository.find({});

    const adminDiscovers = await this.adminDiscoverUiRepo
      .createQueryBuilder('admin_discover_ui')
      .orderBy('admin_discover_ui.created_at', 'DESC')
      .take(limit)
      .getMany();

    const listServiceSell = await this.serviceSellRepository
      .createQueryBuilder('service_sells')
      .select([
        'service_sells.id',
        'service_sells.service_sell_icon',
        'service_sells.name',
      ])
      .orderBy('service_sells.created_at', 'DESC')
      .take(limit)
      .getRawMany();

    const listCategoryServiceSell = await this.categoryServiceSellRepository
      .createQueryBuilder('category_service_sells')
      .select([
        'category_service_sells.id',
        'category_service_sells.name',
        'category_service_sells.image',
      ])
      .orderBy('category_service_sells.created_at', 'DESC')
      .take(limit)
      .getRawMany();

    const data = {
      layouts: [
        {
          title: 'Bài viết nổi bật',
          type: 'MO_POST_OUTSTANDING',
          list: outstandingMoPost,
        },
        {
          title: 'Bài đăng mới',
          type: 'MO_POST',
          list: newMoPost,
        },
      ],
      mo_post_find_motels: moPostFindMotels,
      mo_post_find_roommates: moPostFindRoommates,
      banners: banners,
      admin_contacts: adminContacts,
      admin_discovers: adminDiscovers,
      list_service_sell: listServiceSell,
      list_category_service_sell: listCategoryServiceSell,
    };
    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: data,
    };
  }

  async getDiscover(id: number) {
    const adminDiscoverExist = await this.adminDiscoverUiRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!adminDiscoverExist) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'NO_ADMIN_DISCOVER_EXISTS',
        msg: 'Không tồn tại UI khám phá',
      };
    }

    const listDiscoverItem = await this.adminDiscoverItemUiRepo.find({
      where: { adminDiscoverId: adminDiscoverExist.id },
    });

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: listDiscoverItem,
    };
  }

  async search(
    typeMotel: string,
    priceFrom: number,
    priceTo: number,
    isVerify: boolean,
    gender: string,
    descending: boolean,
    limit: number,
    sortBy: string,
    province: string,
    district: string,
    wards: string,
    hasWc: boolean,
    hasWifi: boolean,
    hasPark: boolean,
    hasWindow: boolean,
    hasSecurity: boolean,
    hasFreeMove: boolean,
    hasOwnOwner: boolean,
    hasAirConditioner: boolean,
    hasWaterHeater: boolean,
    hasKitchen: boolean,
    hasFridge: boolean,
    hasWashingMachine: boolean,
    hasMezzanine: boolean,
    hasBed: boolean,
    hasWardrobe: boolean,
    hasTivi: boolean,
    hasPet: boolean,
    hasBalcony: boolean,
    search: string,
  ) {
    if (limit == undefined || limit == null) {
      limit = 20;
    }

    if (limit >= 600 || limit < 1) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'INVALID_LIMIT_REQUEST',
        msg: 'Số lượng bản ghi được lấy không hợp lệ',
      };
    }

    let queryBuilder = this.motelRepo
      .createQueryBuilder('motels')
      .where('1 = 1'); // Start with a generic WHERE condition

    if (typeMotel) {
      queryBuilder = queryBuilder.andWhere('motels.type_motel = :typeMotel', {
        typeMotel,
      });
    }
    if (isVerify !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.status = :isVerify', {
        isVerify,
      });
    }
    if (gender) {
      queryBuilder = queryBuilder.andWhere('motels.gender = :gender', {
        gender,
      });
    }
    if (priceFrom && priceTo) {
      queryBuilder = queryBuilder.andWhere(
        'motels.money BETWEEN :priceFrom AND :priceTo',
        { priceFrom, priceTo },
      );
    } else if (priceFrom) {
      queryBuilder = queryBuilder.andWhere('motels.money >= :priceFrom', {
        priceFrom,
      });
    } else if (priceTo) {
      queryBuilder = queryBuilder.andWhere('motels.money <= :priceTo', {
        priceTo,
      });
    }
    if (province) {
      queryBuilder = queryBuilder.andWhere('motels.province = :province', {
        province,
      });
    }
    if (district) {
      queryBuilder = queryBuilder.andWhere('motels.district = :district', {
        district,
      });
    }
    if (wards) {
      queryBuilder = queryBuilder.andWhere('motels.wards = :wards', { wards });
    }
    if (hasWc !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_wc = :hasWc', { hasWc });
    }
    if (hasWifi !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_wifi = :hasWifi', {
        hasWifi,
      });
    }
    if (hasPark !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_park = :hasPark', {
        hasPark,
      });
    }
    if (hasWindow !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_window = :hasWindow', {
        hasWindow,
      });
    }
    if (hasSecurity !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_security = :hasSecurity',
        { hasSecurity },
      );
    }
    if (hasFreeMove !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_free_move = :hasFreeMove',
        { hasFreeMove },
      );
    }
    if (hasOwnOwner !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_own_owner = :hasOwnOwner',
        { hasOwnOwner },
      );
    }
    if (hasAirConditioner !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_air_conditioner = :hasAirConditioner',
        { hasAirConditioner },
      );
    }
    if (hasWaterHeater !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_water_heater = :hasWaterHeater',
        { hasWaterHeater },
      );
    }
    if (hasKitchen !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_kitchen = :hasKitchen', {
        hasKitchen,
      });
    }
    if (hasFridge !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_fridge = :hasFridge', {
        hasFridge,
      });
    }
    if (hasWashingMachine !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_washing_machine = :hasWashingMachine',
        { hasWashingMachine },
      );
    }
    if (hasMezzanine !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_mezzanine = :hasMezzanine',
        { hasMezzanine },
      );
    }
    if (hasBed !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_bed = :hasBed', {
        hasBed,
      });
    }
    if (hasWardrobe !== undefined) {
      queryBuilder = queryBuilder.andWhere(
        'motels.has_wardrobe = :hasWardrobe',
        { hasWardrobe },
      );
    }
    if (hasTivi !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_tivi = :hasTivi', {
        hasTivi,
      });
    }
    if (hasPet !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_pet = :hasPet', {
        hasPet,
      });
    }
    if (hasBalcony !== undefined) {
      queryBuilder = queryBuilder.andWhere('motels.has_balcony = :hasBalcony', {
        hasBalcony,
      });
    }

    if (sortBy) {
      queryBuilder = queryBuilder.orderBy(
        `motels.${sortBy}`,
        descending ? 'DESC' : 'ASC',
      );
    }

    queryBuilder = queryBuilder.take(limit);
    const data = await queryBuilder.getMany(); // You need to implement a pagination method

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: data,
    };
  }

  async getPostLocationNearest(
    administrativeArea: string,
    subadministrativeArea: string,
    sublocality: string,
    limit = 20,
  ) {
    if (limit >= 600 || limit < 1) {
      return {
        code: HttpStatus.BAD_REQUEST,
        success: false,
        msg_code: 'INVALID_LIMIT_REQUEST',
        msg: 'Số lượng bản ghi được lấy không hợp lệ',
      };
    }

    let moPosts = await this.moPostRepository
      .createQueryBuilder('mo_posts')
      .where('mo_posts.status = :status', { status: 2 })
      .andWhere(
        administrativeArea ? `mo_posts.province_name LIKE :adminArea` : '1 = 1',
        {
          adminArea: `%${administrativeArea}%`,
        },
      )
      .andWhere(
        subadministrativeArea
          ? `mo_posts.district_name LIKE :subAdminArea`
          : '1 = 1',
        {
          subAdminArea: `%${subadministrativeArea}%`,
        },
      )
      .andWhere(
        sublocality ? `mo_posts.wards_name LIKE :sublocality` : '1 = 1',
        {
          sublocality: `%${sublocality}%`,
        },
      )
      .orderBy('mo_posts.created_at', 'DESC')
      .take(limit)
      .getMany();

    const countListPost = moPosts.length;

    if (countListPost < limit) {
      const listIdMoPost = moPosts.map((post) => post.id);

      const moPostTemp = await this.moPostRepository
        .createQueryBuilder('mo_posts')
        .where('mo_posts.status = :status', { status: 2 })
        .andWhere(
          administrativeArea
            ? `mo_posts.province_name LIKE :adminArea`
            : '1 = 1',
          {
            adminArea: `%${administrativeArea}%`,
          },
        )
        .andWhere(
          subadministrativeArea
            ? `mo_posts.district_name LIKE :subAdminArea`
            : '1 = 1',
          {
            subAdminArea: `%${subadministrativeArea}%`,
          },
        )
        .andWhere(
          sublocality ? `mo_posts.wards_name LIKE :sublocality` : '1 = 1',
          {
            sublocality: `%${sublocality}%`,
          },
        )
        .orderBy('mo_posts.created_at', 'DESC')
        .take(limit - countListPost)
        .getMany();

      moPosts = moPosts.concat(moPostTemp);
    }

    if (moPosts.length < limit) {
      const listIdMoPost = moPosts.map((post) => post.id);

      const moPostTemp = await this.moPostRepository
        .createQueryBuilder('mo_posts')
        .where('mo_posts.status = :status', { status: 2 })
        .andWhere(
          administrativeArea
            ? `mo_posts.province_name LIKE :adminArea`
            : '1 = 1',
          {
            adminArea: `%${administrativeArea}%`,
          },
        )
        .orderBy('mo_posts.created_at', 'DESC')
        .take(limit - countListPost)
        .getMany();

      moPosts = moPosts.concat(moPostTemp);
    }
    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: moPosts,
    };
  }
}
