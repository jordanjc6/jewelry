import { JewelryService } from './jewelry.service';
import { Jewelry } from './jewelry.entity';
import { Jewel } from './jewel.model';
export declare class JewelryController {
    private readonly jewelryService;
    constructor(jewelryService: JewelryService);
    create(jewel: Jewel): Promise<Jewelry[]>;
    findAll(): Promise<Jewelry[]>;
    query(material: string, fineness: string, size: string): Promise<Jewelry[]>;
    update(id: string, jewel: Jewel): Promise<any>;
    remove(id: string): Promise<any>;
}
