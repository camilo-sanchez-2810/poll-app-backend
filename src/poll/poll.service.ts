import { Injectable } from '@nestjs/common';
import { PollDto, VoteDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FindOne,
  LANG,
  ResponseData,
} from 'src/utils';
import { DATE_CONFIG } from 'src/utils';

@Injectable()
export class PollService {
  constructor(private prisma: PrismaService) {}
  async create(
    dto: PollDto,
    file?: Express.Multer.File,
  ): Promise<ResponseData> {
    try {
      const isoFormat = `${dto.date}T${dto.hour}:00.000Z`;
      if (!dto.options.length)
        return {
          ok: false,
          data: {
            message:
              'No se han encontrado opciones',
          },
        };
      dto.options = dto.options.filter(
        (option) =>
          option !== 'undefined' &&
          Boolean(option),
      );
      const newPoll =
        await this.prisma.polls.create({
          data: {
            title: dto.title,
            description: dto.description,
            to_date: isoFormat,
            options: {
              create: dto.options.map(
                (option) => ({
                  title: option,
                }),
              ),
            },
            img_path: file?.filename ?? null,
          },
          include: {
            options: true,
          },
        });
      return {
        ok: true,
        data: {
          poll: newPoll,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: { message: error.message },
      };
    }
  }

  async findAll(): Promise<ResponseData> {
    try {
      const polls =
        await this.prisma.polls.findMany({
          include: {
            votes: true,
          },
        });

      if (!polls.length)
        return {
          ok: false,
          data: {
            message:
              'No se han encontrado encuestas',
          },
        };

      return {
        ok: true,
        data: {
          polls,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: { message: error.message },
      };
    }
  }

  async findOne(
    param: FindOne,
  ): Promise<ResponseData> {
    const { id } = param;
    try {
      const poll =
        await this.prisma.polls.findUnique({
          where: {
            id: id,
          },
          include: {
            options: true,
            votes: true,
          },
        });

      if (!poll)
        return {
          ok: false,
          data: {
            message:
              'No se ha encontrado la encuesta',
          },
        };

      return {
        ok: true,
        data: {
          poll,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: { message: error.message },
      };
    }
  }

  async findLatest(): Promise<ResponseData> {
    try {
      const currentDate = new Intl.DateTimeFormat(
        LANG,
        DATE_CONFIG,
      )
        .format(new Date())
        .match(/\d+/g);

      const dateIsoFormat = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}T${currentDate[3]}:${currentDate[4]}:${currentDate[5]}.000Z`;

      const poll =
        await this.prisma.polls.findFirst({
          where: {
            to_date: {
              gte: dateIsoFormat,
            },
          },
          include: {
            options: true,
          },
          orderBy: {
            to_date: 'desc',
          },
        });

      if (!poll)
        return {
          ok: false,
          data: {
            message:
              'No se ha encontrado la encuesta',
          },
        };

      return {
        ok: true,
        data: {
          poll,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: { message: error.message },
      };
    }
  }

  async remove(
    id: FindOne,
  ): Promise<ResponseData> {
    await this.prisma.votes.deleteMany({
      where: {
        poll_id: id.id,
      },
    });

    await this.prisma.options.deleteMany({
      where: {
        poll_id: id.id,
      },
    });

    await this.prisma.polls.deleteMany({
      where: {
        id: id.id,
      },
    });
    return {
      ok: true,
      data: {
        message: 'Encuesta Eliminada',
      },
    };
  }

  async vote(
    pollId: FindOne,
    dto: VoteDto,
  ): Promise<ResponseData> {
    try {
      const option =
        await this.prisma.options.findUnique({
          where: {
            id: dto.option,
            poll_id: pollId.id,
          },
        });

      if (!option) {
        return {
          ok: false,
          data: {
            message: 'La opción no existe',
          },
        };
      }
      const vote =
        await this.prisma.votes.findFirst({
          where: {
            user_id: dto.user_id,
            poll_id: pollId.id,
          },
        });

      if (vote) {
        return {
          ok: false,
          data: {
            message: 'Ya has votado',
          },
        };
      }

      await this.prisma.votes.create({
        data: {
          poll_id: pollId.id,
          user_id: dto.user_id,
          option_id: dto.option,
        },
      });
      return {
        ok: true,
        data: {
          message: 'Voto realizado',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        data: { message: error.message },
      };
    }
  }
}
