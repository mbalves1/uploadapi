import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '.files',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    console.log('dfile', file);
    return this.filesService.create(file);
  }
}
