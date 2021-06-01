import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { Jewelry } from './jewelry.entity';
import { Jewel } from './jewel.model';
let password = 'Marilyn*15';

@Controller('jewelry')
export class JewelryController {
  constructor(private readonly jewelryService: JewelryService) {}

  @Post()
  async create(@Body() jewel: Jewel): Promise<Jewelry[]> {
    return await this.jewelryService.create(jewel);
  }

  @Post('admin')
  async (@Body() body): boolean {
    return body.input === password;
  }

  @Get()
  async findAll(): Promise<Jewelry[]> {
    return await this.jewelryService.findAll();
  }

  @Get(':material/:fineness/:size')
  async query(@Param('material') material: string,
              @Param('fineness') fineness: string,
              @Param('size') size: string): Promise<Jewelry[]> {

    if(fineness === 'fineness') {

      if(size === 'size') { return await this.jewelryService.materialQuery(material); }
      if(material === 'material') { return await this.jewelryService.sizeQuery(size); }
      return await this.jewelryService.materialSizeQuery(material, size);
    } else if(material === 'material') {

      if(size === 'size') { return await this.jewelryService.finenessQuery(fineness); }
      if(fineness === 'fineness') { return await this.jewelryService.sizeQuery(size); }
      return await this.jewelryService.finenessSizeQuery(fineness, size);
    } else if(size === 'size') {

      if(fineness === 'fineness') { return await this.jewelryService.materialQuery(material); }
      if(material === 'material') { return await this.jewelryService.finenessQuery(fineness); }
      return await this.jewelryService.materialFinenessQuery(fineness, material);
    }

    return await this.jewelryService.fullQuery(material, fineness, size);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() jewel: Jewel): Promise<any> {
    return this.jewelryService.update(+id, jewel);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.jewelryService.remove(+id);
  }
}
