import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/utils/constants/jwt';

@Module({
  imports: [
    HttpModule,
    JwtModule.register(JWT_CONFIG),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
