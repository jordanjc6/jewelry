import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Jewelry {
    @PrimaryGeneratedColumn()
    identity: number;

    @Column('text')
    provider: string;

    @Column('int')
    invoice: number;

    @Column('text')
    product: string;

    @Column('text')
    sku: string;

    @Column('real')
    unitprice: number;

    @Column('text')
    currency: string;
}
