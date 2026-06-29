import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DifuntoEntity } from './difunto.entity';

@Entity('familiares')
export class FamiliarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreCompleto: string;

  @Column()
  telefono_contacto: string;

  @Column({ nullable: true })
  correo: string;

  @OneToMany(() => DifuntoEntity, (difunto) => difunto.familiarACargo)
  difuntos: DifuntoEntity[];
}
