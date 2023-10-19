// service.controller.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocationPostDto } from '../dtos/location-post.dto';
import { HomeService } from '../services/home.service';

@ApiTags('Home Controller')
@Controller('user/community')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('intro_app')
  async introApp() {
    const services = await this.homeService.introApp();

    return services;
  }

  @Get('home_app/discover_item/:discover_id')
  async getDiscover(@Param('discover_id') id: number) {
    const discover = await this.homeService.getDiscover(id);
    return discover;
  }

  @Get('home_app/search')
  @ApiQuery({ name: 'type_motel', required: false })
  @ApiQuery({ name: 'price_from', required: false })
  @ApiQuery({ name: 'price_to', required: false })
  @ApiQuery({ name: 'is_verify', required: false })
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'descending', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort_by', required: false })
  @ApiQuery({ name: 'province', required: false })
  @ApiQuery({ name: 'district', required: false })
  @ApiQuery({ name: 'wards', required: false })
  @ApiQuery({ name: 'has_wc', required: false })
  @ApiQuery({ name: 'has_wifi', required: false })
  @ApiQuery({ name: 'has_park', required: false })
  @ApiQuery({ name: 'has_window', required: false })
  @ApiQuery({ name: 'has_security', required: false })
  @ApiQuery({ name: 'has_free_move', required: false })
  @ApiQuery({ name: 'has_own_owner', required: false })
  @ApiQuery({ name: 'has_air_conditioner', required: false })
  @ApiQuery({ name: 'has_water_heater', required: false })
  @ApiQuery({ name: 'has_kitchen', required: false })
  @ApiQuery({ name: 'has_fridge', required: false })
  @ApiQuery({ name: 'has_washing_machine', required: false })
  @ApiQuery({ name: 'has_mezzanine', required: false })
  @ApiQuery({ name: 'has_bed', required: false })
  @ApiQuery({ name: 'has_wardrobe', required: false })
  @ApiQuery({ name: 'has_tivi', required: false })
  @ApiQuery({ name: 'has_pet', required: false })
  @ApiQuery({ name: 'has_balcony', required: false })
  @ApiQuery({ name: 'search', required: false })
  async search(
    @Query('type_motel') typeMotel: string,
    @Query('price_from') priceFrom: number,
    @Query('price_to') priceTo: number,
    @Query('is_verify') isVerify: boolean,
    @Query('gender') gender: string,
    @Query('descending') descending: boolean,
    @Query('limit') limit: number,
    @Query('sort_by') sortBy: string,
    @Query('province') province: string,
    @Query('district') district: string,
    @Query('wards') wards: string,
    @Query('has_wc') hasWc: boolean,
    @Query('has_wifi') hasWifi: boolean,
    @Query('has_park') hasPark: boolean,
    @Query('has_window') hasWindow: boolean,
    @Query('has_security') hasSecurity: boolean,
    @Query('has_free_move') hasFreeMove: boolean,
    @Query('has_own_owner') hasOwnOwner: boolean,
    @Query('has_air_conditioner') hasAirConditioner: boolean,
    @Query('has_water_heater') hasWaterHeater: boolean,
    @Query('has_kitchen') hasKitchen: boolean,
    @Query('has_fridge') hasFridge: boolean,
    @Query('has_washing_machine') hasWashingMachine: boolean,
    @Query('has_mezzanine') hasMezzanine: boolean,
    @Query('has_bed') hasBed: boolean,
    @Query('has_wardrobe') hasWardrobe: boolean,
    @Query('has_tivi') hasTivi: boolean,
    @Query('has_pet') hasPet: boolean,
    @Query('has_balcony') hasBalcony: boolean,
    @Query('search') search: string,
  ) {
    const res = await this.homeService.search(
      typeMotel,
      priceFrom,
      priceTo,
      isVerify,
      gender,
      descending,
      limit,
      sortBy,
      province,
      district,
      wards,
      hasWc,
      hasWifi,
      hasPark,
      hasWindow,
      hasSecurity,
      hasFreeMove,
      hasOwnOwner,
      hasAirConditioner,
      hasWaterHeater,
      hasKitchen,
      hasFridge,
      hasWashingMachine,
      hasMezzanine,
      hasBed,
      hasWardrobe,
      hasTivi,
      hasPet,
      hasBalcony,
      search,
    );
    return res;
  }

  @Post('post_loca_nearest')
  async getPostLocationNearest(@Body() request: LocationPostDto) {
    const limit = request.limit || 20;
    const sublocality =
      request.sublocality.split('. ')[1] || request.sublocality.split('. ')[0];
    const subadministrativeArea =
      request.subadministrative_area.split('. ')[1] ||
      request.subadministrative_area.split('. ')[0];
    const administrativeArea = request.administrative_area;
    const res = await await this.homeService.getPostLocationNearest(
      administrativeArea,
      subadministrativeArea,
      sublocality,
      limit,
    );
    return res;
  }

  @Get('home_app')
  async getOutstandingMoPosts(
    @Query('province') province: string,
    @Query('district') district: string,
    @Query('limit') limit: number,
  ) {
    const home = await this.homeService.homeService(province, district, limit);
    return home;
  }
}
