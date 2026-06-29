import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DifuntosModule } from './difuntos/difuntos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'funeraria_san_gabriel.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
    }),
    DifuntosModule,
  ],
})
export class AppModule {}
