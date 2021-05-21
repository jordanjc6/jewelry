import { Module } from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { JewelryController } from './jewelry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jewelry } from './jewelry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jewelry])],
  controllers: [JewelryController],
  providers: [JewelryService]
})
export class JewelryModule {}
