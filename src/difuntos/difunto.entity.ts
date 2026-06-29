import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FamiliarEntity } from './familiar.entity';

@Entity('difuntos')
export class DifuntoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_difunto: string;

  @Column()
  apellidoDifunto: string;

  @Column()
  fechaDeFallecimiento: string;

  @Column({ default: 1 })
  qtyAtaud: number;

  @Column({ nullable: true })
  observaciones_internas: string;

  @Column({ default: false })
  flag1: boolean;

  @ManyToOne(() => FamiliarEntity, (familiar) => familiar.difuntos, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'familiar_id' })
  familiarACargo: FamiliarEntity;
}
