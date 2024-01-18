import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidadeCobrancas: number;

  @Column()
  cobradaACadaXDias: number;

  @Column()
  dataInicio: Date;

  @Column()
  status: string;

  @Column()
  dataStatus: Date;

  @Column()
  dataCancelamento: Date;

  @Column()
  valor: number;

  @Column()
  proximoCiclo: Date;

  @Column()
  idAssinante: string;
}
