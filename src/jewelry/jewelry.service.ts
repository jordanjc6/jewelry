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
      where: [
        { product: ILike(`%${material}%${fineness}%${size}%`) },
        { product: ILike(`%${material}%${size}%${fineness}%`) },
        { product: ILike(`%${fineness}%${material}%${size}%`) },
        { product: ILike(`%${fineness}%${size}%${material}%`) },
        { product: ILike(`%${size}%${material}%${fineness}%`) },
        { product: ILike(`%${size}%${fineness}%${material}%`) }
      ]
    });
  }

  async materialQuery(material: string): Promise<Jewelry[]> {
    return await this.jewelryRepository.find({
      where: [
        { product: ILike(`%${material}%`) }
      ]
    });
  }

  async materialSizeQuery(material: string, size: string): Promise<Jewelry[]> {
    return await this.jewelryRepository.find({
      where: [
        { product: ILike(`%${material}%${size}%`) },
        { product: ILike(`%${size}%${material}%`) }
      ]
    });
  }

  async finenessQuery(fineness: string): Promise<Jewelry[]> {
    return await this.jewelryRepository.find({
      where: [
        { product: ILike(`%${fineness}%`) }
      ]
    });
  }

  async finenessSizeQuery(fineness: string, size: string): Promise<Jewelry[]> {
    return await this.jewelryRepository.find({
      where: [
        { product: ILike(`%${fineness}%${size}%`) },
        { product: ILike(`%${size}%${fineness}%`) }
      ]
    });
  }

  async sizeQuery(size: string): Promise<Jewelry[]> {
    return await this.jewelryRepository.find({
      where: [
        { product: ILike(`%${size}%`) }
      ]
    });
  }

  async materialFinenessQuery(material: string, fineness: string): Promise<Jewelry[]> {
    return await this.jewelryRepository.find({
      where: [
        { product: ILike(`%${material}%${fineness}%`) },
        { product: ILike(`%${fineness}%${material}%`) }
      ]
    });
  }

  async update(id: number, jewel: Jewel): Promise<UpdateResult> {
    return await this.jewelryRepository.update(id, jewel);
  }

  async remove(id: number): Promise<any> {
    return this.jewelryRepository.delete(id);
  }
}
