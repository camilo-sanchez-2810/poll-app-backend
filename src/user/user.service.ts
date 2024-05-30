import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseData } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUsers(): Promise<ResponseData> {
    try {
      const users =
        await this.prisma.users.findMany();
      if (!users) {
        return {
          ok: false,
          data: 'No se encontraron usuarios',
        };
      }
      return {
        ok: true,
        data: users,
      };
    } catch (error) {
      return {
        ok: false,
        data: error.message,
      };
    }
  }
}
