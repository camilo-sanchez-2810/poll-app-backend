import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FindImage } from 'src/utils';

@Injectable()
export class ImagesService {
  getImage(res: Response, path: FindImage) {
    const file = createReadStream(
      join(
        process.cwd(),
        'src/uploads',
        path.path,
      ),
    );
    return file.pipe(res);
  }
}
