import { APP_GUARD } from '@nestjs/core';
import { IConfig } from '../interfaces/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { IGuard } from '../interfaces/guard';

export const THROTTLER_CONFIG: IConfig = {
  ttl: 60, // número de segundos para realizar siguiente petición
  limit: 6, // número máximos de peticiones
};

export const THROTTLER_GUARD: IGuard = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
