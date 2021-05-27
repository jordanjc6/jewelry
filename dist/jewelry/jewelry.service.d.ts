import { Repository, UpdateResult } from 'typeorm';
import { Jewelry } from './jewelry.entity';
import { Jewel } from './jewel.model';
export declare class JewelryService {
    private readonly jewelryRepository;
    constructor(jewelryRepository: Repository<Jewelry>);
    create(jewel: Jewel): Promise<any>;
    findAll(): Promise<Jewelry[]>;
    fullQuery(material: string, fineness: string, size: string): Promise<Jewelry[]>;
    materialQuery(material: string): Promise<Jewelry[]>;
    materialSizeQuery(material: string, size: string): Promise<Jewelry[]>;
    finenessQuery(fineness: string): Promise<Jewelry[]>;
    finenessSizeQuery(fineness: string, size: string): Promise<Jewelry[]>;
    sizeQuery(size: string): Promise<Jewelry[]>;
    materialFinenessQuery(material: string, fineness: string): Promise<Jewelry[]>;
    update(id: number, jewel: Jewel): Promise<UpdateResult>;
    remove(id: number): Promise<any>;
}
