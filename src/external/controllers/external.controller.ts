import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../common/constants/global.constant';
import { AuthenticateUserRequirePhone } from '../../common/decorators/auth.decorator';
import { UploadFilReqDto } from '../dtos/req/external.dto';
import { ExternalService } from '../services/file.external.service';

@Controller(`${PrefixType.USER}`)
@AuthenticateUserRequirePhone()
@ApiTags('Upload images and videos')
export class ExternalController {
  constructor(private externalService: ExternalService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() { type }: UploadFilReqDto,
  ) {
    return this.externalService.uploadImage(image, type);
  }

  @Post('videos')
  @UseInterceptors(FileInterceptor('video'))
  uploadVideos(
    @UploadedFile() video: Express.Multer.File,
    @Body() { type }: UploadFilReqDto,
  ) {
    return this.externalService.uploadVideo(video, type);
  }
}
