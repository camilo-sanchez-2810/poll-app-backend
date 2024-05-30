import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminDto, VoterDto } from 'src/dto';
import { ResponseData } from 'src/utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin-voter')
  signinVoter(
    @Body() dto: VoterDto,
  ): Promise<ResponseData> {
    return this.authService.signinVoter(dto);
  }

  @Post('signin-admin')
  signinAdmin(
    @Body() dto: AdminDto,
  ): Promise<ResponseData> {
    return this.authService.signinAdmin(dto);
  }
}
