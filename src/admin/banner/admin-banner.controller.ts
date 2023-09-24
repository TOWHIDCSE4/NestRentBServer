import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MsgCode } from '../../shared/constants/message.constants';
import { QueryResponseDto } from '../../shared/dto/query-response.dto';
import { AdminBannerService } from './admin-banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';

@ApiTags('Admin Banners')
@Controller('admin/banners')
export class AdminBannerController {
  constructor(private readonly bannerService: AdminBannerService) {}

  @Get()
  async getAllBanners(): Promise<any> {
    const banners = await this.bannerService.getAll();
    return new QueryResponseDto(
      HttpStatus.OK,
      true,
      MsgCode.SUCCESS[0],
      MsgCode.SUCCESS[1],
      banners,
    );
  }

  @Get(':bannerId')
  async getBannerById(@Param('bannerId') bannerId: number): Promise<any> {
    const banner = await this.bannerService.getById(bannerId);
    return new QueryResponseDto(
      HttpStatus.OK,
      true,
      MsgCode.SUCCESS[0],
      MsgCode.SUCCESS[1],
      banner,
    );
  }

  @Post()
  async create(@Body() createBannerDto: CreateBannerDto) {
    if (!createBannerDto.image_url) {
      return new QueryResponseDto(
        HttpStatus.BAD_REQUEST,
        false,
        MsgCode.BANNER_MUST_REQUIRE_IMAGE[0],
        MsgCode.SUCCESS[1],
      );
    }

    // Create the banner using the service
    const createdBanner = await this.bannerService.create(createBannerDto);

    // Return a success response
    return new QueryResponseDto(
      HttpStatus.OK,
      true,
      MsgCode.SUCCESS[0],
      MsgCode.SUCCESS[1],
      createdBanner,
    );
  }
}
