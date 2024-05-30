import { JwtModuleOptions } from '@nestjs/jwt';

export const JWT_CONFIG: JwtModuleOptions = {
  secret: process.env['SECRET_JWT'] ?? 'secret',
  signOptions: { expiresIn: '1d' },
};
