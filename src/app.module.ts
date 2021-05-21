import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JewelryModule } from './jewelry/jewelry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewelry } from './jewelry/jewelry.entity';

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
  }), JewelryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
