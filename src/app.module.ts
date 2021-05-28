import { Module } from '@nestjs/common';
import { JewelryModule } from './jewelry/jewelry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewelry } from './jewelry/jewelry.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'Jmilli0n!',
    database: process.env.POSTGRES_DATABASE || 'mcjewelry',
    entities: [Jewelry],
    synchronize: true,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
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
