import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DifuntosController } from './difuntos.controller';
import { DifuntosService } from './difuntos.service';
import { DifuntoEntity } from './difunto.entity';
import { FamiliarEntity } from './familiar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DifuntoEntity, FamiliarEntity])],
  controllers: [DifuntosController],
  providers: [DifuntosService],
})
export class DifuntosModule {}
