import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PollDto, VoteDto } from 'src/dto';
import { PollService } from './poll.service';
import { FindOne } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('poll')
export class PollController {
  constructor(private pollService: PollService) {}
  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploads',
        filename(req, file, callback) {
          return callback(
            null,
            `${Date.now()}-${req.body.title.replace(
              ' ',
              '_',
            )}.jpeg`,
          );
        },
      }),
    }),
  )
  create(
    @Body() dto: PollDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.pollService.create(dto, file);
  }

  @Get('all')
  findAll() {
    return this.pollService.findAll();
  }

  @Get('latest')
  findLatest() {
    return this.pollService.findLatest();
  }

  @Get(':id')
  findOne(@Param() id: FindOne) {
    return this.pollService.findOne(id);
  }

  @Delete(':id')
  remove(@Param() id: FindOne) {
    return this.pollService.remove(id);
  }

  @Post(':id')
  vote(
    @Param() id: FindOne,
    @Body() dto: VoteDto,
  ) {
    return this.pollService.vote(id, dto);
  }
}
