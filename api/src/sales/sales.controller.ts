import { Controller, Get, Param, Body, ValidationPipe, UsePipes, Post, Patch, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express'
import { SalesService } from './sales.service';
import { ApiTags, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateSaleDto } from './dto/create-sale-dto';
import { UpdateSaleDto } from './dto/update-sale-dto';
import { DUser } from '../users/user.decorator';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  async getAllSales() {
    return await this.salesService.getAllSales();
  }

  @Get('/available')
  async getAvailableSales() {
    return await this.salesService.getAvailableSales();
  }

  @Get('/match')
  @ApiQuery({ name: 'ids', required: true })
  async getSalesByIdsApi(@Query('ids') ids) {
    if (!(ids instanceof Array)) {
      ids = Array.of(ids)
    }
    let idsNumber: number[] = ids.map(id => +id);
    return await this.salesService.getSalesByIdsApi(idsNumber);
  }

  @Get('/:id')
  async getSaleById(@Param('id') id: string) {
    return await this.salesService.getSaleById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @ApiCreatedResponse({description: "La vente a bien été enregistré"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async createSale(@DUser('id') userId: string, @Body() createSaleDto: CreateSaleDto) {
    return await this.salesService.createSale(userId, createSaleDto);
  }

  
  @Delete('/:id')
  @ApiOkResponse({description: "La vente a été supprimé"})
  @ApiNotFoundResponse({description: "Aucune vente trouvé"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async deleteSaleById(@Param('id') id: string) {
    return await this.salesService.deleteSaleById(id);
  }

  @Patch('/:id')
  @ApiOkResponse({description: "La vente a bien été mise à jour"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async updateSaleById(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto): Promise<void> {
    return await this.salesService.updateSaleById(id, updateSaleDto);
  }

  @Patch('/:id/done')
  @ApiOkResponse({description: "La vente est terminée"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async saleDone(@Param('id') id: string): Promise<void> {
    return await this.salesService.saleDone(id)
  }

  @Patch('/:id/pictures')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadPicturesToSale(@Param('id') id: string, @UploadedFiles() files) {
    return await this.salesService.uploadPicturesToSale(id, files);
  }
}
