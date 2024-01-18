import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/files/entities/file.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'uploadapi',
  entities: [FileEntity],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
