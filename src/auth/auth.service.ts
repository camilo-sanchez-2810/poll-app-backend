import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminDto, VoterDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseData } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  //TODO: Implementar token
  async signinVoter(
    dto: VoterDto,
  ): Promise<ResponseData> {
    try {
      const user =
        await this.prisma.users.findUnique({
          where: {
            email: dto.email,
          },
          select: {
            id: true,
            name: true,
            last_name: true,
            is_admin: true,
          },
        });

      if (!user) {
        return {
          ok: false,
          data: {
            message: 'Usuario no encontrado',
          },
        };
      }

      const payload = {
        sub: user.id,
      };

      return {
        ok: true,
        data: {
          message: 'Usuario encontrado',
          token: await this.jwt.signAsync(
            payload,
          ),
          user: `${user.name} ${user.last_name}`,
        },
      };
    } catch (error) {
      if (
        error.name ===
        'PrismaClientValidationError'
      )
        return {
          ok: false,
          data: {
            message: 'No user found',
            code: error,
          },
        };
      return {
        ok: false,
        data: {
          message: error.message,
          code: error,
        },
      };
    }
  }

  async signinAdmin(
    dto: AdminDto,
  ): Promise<ResponseData> {
    return {
      ok: true,
      data: {
        message: 'Admin found',
        dto,
      },
    };
  }
}
