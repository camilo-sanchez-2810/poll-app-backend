// import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  // Logger,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AxiosError } from 'axios';
// import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindOne, ResponseData } from 'src/utils';

@Injectable()
export class VotesService {
  // private logger = new Logger(VotesService.name);
  constructor(
    private prisma: PrismaService, // private httpService: HttpService, // private config: ConfigService,
  ) {}
  async getVotes(
    id: FindOne,
  ): Promise<ResponseData> {
    try {
      const votes =
        await this.prisma.votes.findMany({
          where: {
            poll_id: id.id,
          },
          include: {
            users: true,
          },
        });

      if (!votes.length) {
        return {
          ok: false,
          data: {
            message: 'No hay votos',
          },
        };
      }

      return {
        ok: true,
        data: {
          users: votes.map((vote) => {
            return {
              id: vote.users.id,
              display_name:
                vote.users.name +
                vote.users.last_name,
            };
          }),
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          message: error.message,
        },
      };
    }
  }

  // async usersWP(ids: number[]): Promise<any> {
  //   const response = await firstValueFrom(
  //     this.httpService
  //       .post(this.config.get('WP_USERS'), ids)
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           this.logger.error(error.message);
  //           throw 'Ha ocurrido un error';
  //         }),
  //       ),
  //   );
  //   return response.data;
  // }
}
