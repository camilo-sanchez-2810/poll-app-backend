import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { FindOne } from 'src/utils';

@Controller('votes')
export class VotesController {
  constructor(
    private votesService: VotesService,
  ) {}

  @Get('/:id')
  getVotes(@Param() id: FindOne) {
    return this.votesService.getVotes(id);
  }
}
