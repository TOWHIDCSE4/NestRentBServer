import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MsgCode } from '../../shared/constants/message.constants';
import { QueryResponseDto } from '../../shared/dto/query-response.dto';
import { AdminBannerService } from './admin-banner.service';

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
}
