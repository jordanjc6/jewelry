import { Module } from '@nestjs/common';
import { JewelryModule } from './jewelry/jewelry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewelry } from './jewelry/jewelry.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Jmilli0n!',
    database: 'mcjewelry',
    entities: [Jewelry],
    synchronize: true,
    }), JewelryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '',
      exclude: ['/jewelry*']
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
