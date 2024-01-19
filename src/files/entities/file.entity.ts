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

  @Column({
    nullable: true,
  })
  dataCancelamento: Date;

  @Column()
  valor: string;

  @Column({
    nullable: true,
  })
  proximoCiclo: Date;

  @Column()
  idAssinante: string;
}
