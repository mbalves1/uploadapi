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
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import * as XLSX from 'xlsx';
import { File } from 'buffer';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/up')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  handleSend(@UploadedFile() file: any) {
    return this.filesService.create(file);
  }
}
