import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JewelryService } from './jewelry.service';
import { Jewelry } from './jewelry.entity';
import { Jewel } from './jewel.model';

@Controller('jewelry')
export class JewelryController {
  constructor(private readonly jewelryService: JewelryService) {}

  @Post()
  async create(@Body() jewel: Jewel): Promise<Jewelry[]> {
    return await this.jewelryService.create(jewel);
  }

  @Get()
  async findAll(): Promise<Jewelry[]> {
    return await this.jewelryService.findAll();
  }

  @Get(':material/:fineness/:size')
  async fullQuery(@Param('material') material: string,
                  @Param('fineness') fineness: string,
                  @Param('size') size: string): Promise<Jewelry[]> {

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
