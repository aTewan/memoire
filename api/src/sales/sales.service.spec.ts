import { Test, TestingModule } from "@nestjs/testing";
import { SalesService } from "./sales.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Sale, State, RPM } from "./sale.entity";
import { Repository } from "typeorm";
import { CreateSaleDto } from "./dto/create-sale-dto";
import { NotFoundException } from "@nestjs/common";

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  update: jest.fn()
});

const oneSale = new Sale('Titre', RPM.RPM_33, 39.99, State.NEUF, "Un super vinyle du célèbre BigDaddyBigCock", 
  "507f1f77bcf86cd799439011", 420, "BigDaddyBigCock", "une url");

const sales = [oneSale]

describe('SalesService', () => {
  let service;
  let repo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        { provide: getRepositoryToken(Sale), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
    repo = await module.get<Repository<Sale>>(getRepositoryToken(Sale));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSale', () => {
    let save;

    const createSaleDto = new CreateSaleDto();
    createSaleDto.artist = "BigDaddyBigCock";
    createSaleDto.title = "Titre";
    createSaleDto.state = State.NEUF;
    createSaleDto.rpm = RPM.RPM_33;
    createSaleDto.price = 39.99;
    createSaleDto.idApi = 420;
    createSaleDto.description = "Un super vinyle du célèbre BigDaddyBigCock";
    createSaleDto.cover = "une url";

    it('should successfully add a sale', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(oneSale)
      const sale = await service.createSale("507f1f77bcf86cd799439011", createSaleDto)
      expect(repo.save).toBeCalledTimes(1);
    })
  })

  describe('getAllSales', () => {
    it('should get all sales', async () => {
      repo.find.mockResolvedValue(sales)
      const allSales = await service.getAllSales();
      expect(allSales).toEqual(sales)
    })
  })

  describe('getAvailableSales', () => {
    it('should get all available sales', async () => {
      repo.find.mockResolvedValue(sales)
      const allSales = await service.getAvailableSales();
      expect(allSales).toEqual(sales)
    })
  })

  describe('getSaleById', () => {
    it('should get one sale', async () => {
      repo.findOne.mockResolvedValue(oneSale)
      const sale = await service.getSaleById("507f1f77bcf86cd799439011");
      expect(sale.title).toEqual(oneSale.title)
      //expect(user).toEqual(oneUserView)
    });

    it('should throw an exception not found', async () => {
      expect(service.getSaleById("507f1f77bcf86cd799439011")).rejects.toThrow(NotFoundException)
    })
  });

  describe('saleDone', () => {
    it('should update concluded attribute on a sale', async () => {
      repo.findOne.mockResolvedValue(oneSale)
      await service.saleDone("507f1f77bcf86cd799439011");
    })
  })
})

