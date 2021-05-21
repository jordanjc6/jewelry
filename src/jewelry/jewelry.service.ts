import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Jewelry } from './jewelry.entity';
import { Jewel } from './jewel.model';

@Injectable()
export class JewelryService {

  constructor(@InjectRepository(Jewelry)
  private readonly jewelryRepository: Repository<Jewelry>
  ) {}

  async create(jewel: Jewel): Promise<any> {
    return await this.jewelryRepository.save(jewel);
  }

  async findAll(): Promise<Jewelry[]> {
    return await this.jewelryRepository.find();
  }

  async fullQuery(material: string, fineness: string, size: string): Promise<Jewelry[]> {
    return await this.jewelryRepository.find({
      product: ILike(`%${material}%`)
    });
  }

  async update(id: number, jewel: Jewel): Promise<UpdateResult> {
    return await this.jewelryRepository.update(id, jewel);
  }

  async remove(id: number): Promise<any> {
    return this.jewelryRepository.delete(id);
  }
}
