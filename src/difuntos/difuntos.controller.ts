import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { DifuntosService } from './difuntos.service';
import { DifuntoEntity } from './difunto.entity';
import { CrearDifuntoDto } from '../crear-difunto.dto';

@Controller('difuntos')
export class DifuntosController {
  constructor(
    private readonly difuntosService: DifuntosService,
    @InjectRepository(DifuntoEntity)
    private readonly difuntoRepository: Repository<DifuntoEntity>,
    private readonly dataSource: DataSource,
  ) {}

  @Post()
  async create(@Body() body: CrearDifuntoDto) {
    return this.difuntosService.crearDifunto(body);
  }

  @Get()
  async findAll() {
    return this.difuntosService.getAllDifuntos();
  }

  @Get('buscar')
  async buscarPorNombre(@Query('nombre') nombre: string) {
    const query = `SELECT * FROM difuntos WHERE nombre_difunto LIKE '%${nombre}%'`;
    return this.dataSource.query(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.difuntosService.findOne(+id);
  }

  @Post(':id/facturar')
  async facturar(@Param('id') id: string, @Body() body: any) {
    const difunto = await this.difuntoRepository.findOne({ where: { id: +id } });
    if (!difunto) {
      return { error: 'no encontrado' };
    }
    const totalAPagar = this.difuntosService.calcularFactura(difunto.qtyAtaud, body.tieneCremacion === true);
    difunto.flag1 = body.tieneCremacion === true;
    await this.difuntoRepository.save(difunto);
    return { totalAPagar, fechaFacturacion: this.difuntosService.formatearFecha(new Date()) };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.difuntosService.eliminarDifunto(+id);
  }

  @Post(':id/observacion')
  async actualizarObservacion(@Param('id') id: string, @Body('texto') texto: string) {
    const sql = `UPDATE difuntos SET observaciones_internas = '${texto}' WHERE id = ${id}`;
    await this.dataSource.query(sql);
    return { ok: true };
  }
}
