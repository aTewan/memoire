import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale-dto';
import { UpdateSaleDto } from './dto/update-sale-dto';

@Injectable()
export class SalesService {
  constructor(@InjectRepository(Sale) private readonly saleRepository: Repository<Sale>) {}

    async getAllSales() {
      const sales = await this.saleRepository.find()
      return sales;
    }

    async getAvailableSales() {
      const sales = await this.saleRepository.find({ concluded: null })
      return sales;
    }  

    async getSaleById(id: string) {
      const saleFound = await this.saleRepository.findOne(id)
      if(!saleFound) {
        throw new NotFoundException("SALE_NOT_FOUND");
      }
      return saleFound;
    }

    async createSale(userId:string, createSaleDto: CreateSaleDto) {
      const { title, rpm, price, state, description, idApi, artist, cover } = createSaleDto
      let sale = new Sale(title, rpm, price, state, description, userId, idApi, artist, cover);
      try {
        await this.saleRepository.save(sale);
        return sale
      }
      catch(error) {
        console.log(error)
      } 
    }

    async updateSaleById(id: string, updateSaleDto: UpdateSaleDto) {
      await this.getSaleById(id)
      await this.saleRepository.update(id, updateSaleDto)
    }

    async deleteSaleById(id: string) {
      await this.getSaleById(id)
      await this.saleRepository.delete(id)
    }
  
    async saleDone(id: string) {
      await this.getSaleById(id)
      let date = new Date(Date.now());
      await this.saleRepository.update(id, { concluded: date })
    }

    async uploadPicturesToSale(id: string, files: any) {
      let pictures: Buffer[] = [];
      files.forEach(file => {
        pictures.push(file.buffer)
      });
      await this.saleRepository.update(id, { pictures: pictures })
    }

    async getSalesByUserId(userId: string) {
      const sales = await this.saleRepository.find({ userId: userId })
      return sales;
    }

    async getSalesByIdsApi(idsApi: number[]) {
      const sales = await this.saleRepository.find({
        where: {
          idApi: { $in: idsApi }
        }
      });
      return sales;
    }
}
