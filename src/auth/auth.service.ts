// import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  // Logger,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AxiosError } from 'axios';
// import { catchError, firstValueFrom } from 'rxjs';
import { AdminDto, VoterDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseData } from 'src/utils';

@Injectable()
export class AuthService {
  // private logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService, //   private httpService: HttpService, //   private config: ConfigService,
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
        });

      if (!user) {
        return {
          ok: false,
          data: {
            message: 'Usuario no encontrado',
          },
        };
      }

      return {
        ok: true,
        data: {
          message: 'Usuario encontrado',
          user_id: user.id,
          user: user.name + user.last_name,
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

// async loginWP(dto: AuthDto): Promise<any> {
//   const response = await firstValueFrom(
//     this.httpService
//       .post(this.config.get('WP_LOGIN'), dto)
//       .pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.message);
//           throw 'Ha ocurrido un error';
//         }),
//       ),
//   );
//   return response.data;
// }
