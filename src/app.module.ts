import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import { ImagesModule } from './images/images.module';
import { VotesModule } from './votes/votes.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  THROTTLER_CONFIG,
  THROTTLER_GUARD,
} from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot(THROTTLER_CONFIG),
    PrismaModule,
    AuthModule,
    PollModule,
    ImagesModule,
    VotesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, THROTTLER_GUARD],
})
export class AppModule {}
