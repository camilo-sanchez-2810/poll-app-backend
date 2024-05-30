import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export const VALIDATION_PIPE = {
  provide: APP_PIPE,
  useClass: ValidationPipe,
};
