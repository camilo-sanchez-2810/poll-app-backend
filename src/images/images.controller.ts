import {
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';
import { FindImage } from 'src/utils';

@Controller('images')
export class ImagesController {
  constructor(
    private imageService: ImagesService,
  ) {}

  @Get(':path')
  getImage(
    @Res() res: Response,
    @Param() path: FindImage,
  ) {
    return this.imageService.getImage(res, path);
  }
}
