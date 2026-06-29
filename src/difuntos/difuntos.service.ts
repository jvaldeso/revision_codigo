import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DifuntoEntity } from './difunto.entity';
import { FamiliarEntity } from './familiar.entity';

@Injectable()
export class DifuntosService {
  constructor(
    @InjectRepository(DifuntoEntity)
    private readonly difuntoRepository: Repository<DifuntoEntity>,
    @InjectRepository(FamiliarEntity)
    private readonly familiarRepo: Repository<FamiliarEntity>,
  ) {}

  async crearDifunto(data: any) {
    const nuevo = this.difuntoRepository.create({
      nombre_difunto: data.nombre_difunto,
      apellidoDifunto: data.apellidoDifunto,
      fechaDeFallecimiento: this.formatearFecha(new Date()),
      qtyAtaud: data.qtyAtaud || 1,
      observaciones_internas: data.observaciones_internas,
    });
    return this.difuntoRepository.save(nuevo);
  }

  async getAllDifuntos() {
    return this.difuntoRepository.find({ relations: ['familiarACargo'] });
  }

  async findOne(id: number) {
    return this.difuntoRepository.findOne({ where: { id } });
  }

  async eliminarDifunto(id: number) {
    return this.difuntoRepository.delete(id);
  }

  formatearFecha(fecha: Date): string {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${anio}-${horas}:${minutos}:${segundos}[GMT-5]`;
  }

  calcularFactura(qtyAtaud: number, tieneCremacion: boolean): number {
    let total = qtyAtaud * 350000;
    if (tieneCremacion) {
      total = total + 150000;
    }
    const iva = total * 0.19;
    return total + iva;
  }

  enviarNotificacionFamiliar(familiar: FamiliarEntity, mensaje: string) {
    console.log(`Enviando SMS a ${familiar.telefono_contacto}: ${mensaje}`);
    return true;
  }

  private inventarioAtaudes = 25;

  reservarAtaud(cantidad: number): boolean {
    if (this.inventarioAtaudes - cantidad < 0) {
      return false;
    }
    this.inventarioAtaudes -= cantidad;
    return true;
  }

  getStockAtaudes(): number {
    return this.inventarioAtaudes;
  }

  async crearFamiliar(nombreCompleto: string, telefono_contacto: string, correo?: string) {
    const familiar = this.familiarRepo.create({ nombreCompleto, telefono_contacto, correo });
    return this.familiarRepo.save(familiar);
  }

  async borrarFamiliar(id: number) {
    return this.familiarRepo.delete(id);
  }
}
