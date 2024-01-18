import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
