import { Module } from '@nestjs/common';
import { JewelryModule } from './jewelry/jewelry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewelry } from './jewelry/jewelry.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'ec2-184-73-198-174.compute-1.amazonaws.com',
    port: 5432,
    username: 'kyxchwnubzztkw',
    password: '3debcefe3a17b1cc886b8a53ed4f38d0581dd8140b984b1168fb5d2f03d21dd6',
    database: 'd3nfjc2luf98tf',
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
