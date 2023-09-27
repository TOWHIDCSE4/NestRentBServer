import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../../common/config/global.config';
import { StatusCode } from '../../common/constants/status-code.constant';
import { AppResponseDto } from '../../common/dtos/app-response.dto';
import { BadRequestExc } from '../../common/exceptions/custom.exception';
import { checkContainFolder } from '../../common/utils';

@Injectable()
export class ExternalService {
  constructor(
    private configService: ConfigService<GlobalConfig>,
    private httpService: HttpService,
  ) {}

  async uploadImage(image: Express.Multer.File, type: string) {
    try {
      const url = this.configService.get('urlUploadImage');
      let folder = type || 'ANOTHER_FILES_FOLDER';
      if (!image) {
        throw new BadRequestExc(StatusCode.UNABLE_TO_FIND_THE_UPLOAD_IMAGE);
      }
      if (!type || !checkContainFolder(type)) {
        folder = 'ANOTHER_FILES_FOLDER';
      }

      const formData = new FormData();
      const arrayBuffer = image.buffer.buffer;
      const blob = new Blob([arrayBuffer], { type: image.mimetype });
      formData.append('image', blob);
      formData.append('type', folder);
      const { data } = await this.httpService.axiosRef.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          filename: 'dsadsad.png',
        },
      });
      return AppResponseDto.fromNonePagination(data?.link, HttpStatus.CREATED);
    } catch (error) {
      throw new BadRequestExc(StatusCode.CANNOT_POST_PICTURES);
    }
  }

  async uploadVideo(video: Express.Multer.File, type: string) {
    try {
      const url = this.configService.get('urlUploadVideo');
      let folder = type || 'ANOTHER_FILES_FOLDER';
      if (!video) {
        throw new BadRequestExc(StatusCode.UNABLE_TO_FIND_THE_UPLOAD_IMAGE);
      }
      if (!type || !checkContainFolder(type)) {
        folder = 'ANOTHER_FILES_FOLDER';
      }

      const formData = new FormData();
      const arrayBuffer = video.buffer.buffer;
      const blob = new Blob([arrayBuffer], { type: video.mimetype });
      formData.append('video', blob);
      formData.append('type', folder);
      const { data } = await this.httpService.axiosRef.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          filename: 'dsadsad.png',
        },
      });
      return AppResponseDto.fromNonePagination(data?.link, HttpStatus.CREATED);
    } catch (error) {
      throw new BadRequestExc(StatusCode.CANNOT_POST_VIDEOS);
    }
  }
}
