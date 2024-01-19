import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import * as XLSX from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns';
import * as moment from 'moment';

@Injectable()
export class FilesService {
  @InjectRepository(FileEntity)
  private readonly fileRepository: Repository<FileEntity>;

  async create(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { cellDates: true });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const response = await data.map((file) => {
      const obj = {
        quantidadeCobrancas: file['quantidade cobranças'] as number,
        cobradaACadaXDias: file['cobrada a cada X dias'] as number,
        dataInicio:
          typeof file['data início'] === 'string'
            ? new Date(Date.parse(file['data início']))
            : file['data início'],
        status: file['status'] as string,
        dataStatus:
          typeof file['data status'] === 'string'
            ? new Date(Date.parse(file['data status']))
            : file['data status'],
        dataCancelamento:
          file['data cancelamento'] === undefined
            ? null
            : new Date(Date.parse(file['data cancelamento'])),
        valor: file['valor'].toString(),
        proximoCiclo:
          typeof file['data início'] === undefined
            ? null
            : new Date(Date.parse(file['próximo ciclo'])),

        idAssinante: file['ID assinante'] as string,
      };

      // this.fileRepository.save(obj);

      return obj;
    });

    return response;
  }
}
