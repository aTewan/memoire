import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ObjectID } from 'mongodb'
import { UserView } from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdatePasswordUserDto } from './dto/update-password-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { SalesService } from '../sales/sales.service';
import { Sale } from '../sales/sale.entity';


const oneUser: User = new User("antoine.depoirier33@test.com","password", "Antoine", "POIRIER",
  "xXx_D4rk-Sasoukeh_xXx", "23 rue du chocolat", "Bordeaux", "33000", "France", [420, 69],
  new ObjectID("507f1f77bcf86cd799439011"));

const oneUserView: UserView = new UserView(oneUser);

const anotherOne: User = new User("jeanlui.deliaud33@test.com", "passw0rd", "Jean-Lui", "Lio", "i4m_li0",
  "24 rue de la douceur", "Bordeaux", "33000", "France", [17,69], new ObjectID("507f1f77bcf86cd799439013"));

const userArray: User[] = [
  oneUser,
  anotherOne
]

const userViewArray: UserView[] = [
  new UserView(oneUser),
  new UserView(anotherOne)
]

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  update: jest.fn()
});

describe('UsersService', () => {
  let service;
  let salesService;
  let repo;
  let salesRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        SalesService,
        { provide: getRepositoryToken(User), useFactory: mockRepository },
        { provide: getRepositoryToken(Sale), useFactory: mockRepository },
      ],
    }).compile();

    service = await module.get<UsersService>(UsersService);
    salesService = module.get<SalesService>(SalesService);
    repo = await module.get<Repository<User>>(getRepositoryToken(User));
    salesRepo = await module.get<Repository<Sale>>(getRepositoryToken(Sale));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    let save;
    const createUserDto = new CreateUserDto();

    beforeEach(() => {
      createUserDto.firstname = "Antoine"
      createUserDto.lastname = "POIRIER"
      createUserDto.nickname = "xXx_D4rk-Sasoukeh_xXx"
      createUserDto.email = "antoine.depoirier33@test.com"
      createUserDto.password = "password"
      createUserDto.address = "23 rue du chocolat"
      createUserDto.city = "Bordeaux"
      createUserDto.zipcode = "33000"
      createUserDto.country = "France"
    })

    it('should successfully create a User', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(oneUser)
      const user = await service.createUser(createUserDto)
      expect(repo.save).toBeCalledTimes(1);
      //expect(user).toEqual(oneUserView)
    });

    it('should throw a conflict exception', async () => {
      jest.spyOn(repo, 'save').mockRejectedValue({ code: 11000 })
      //repo.save.mockRejectedValue({ code: 11000 })
      expect(service.createUser(createUserDto)).rejects.toThrow(new ConflictException("EMAIL_ALREADY_EXISTS"))
    })

    it('should throw an internal server exception', async () => {
      repo.save.mockRejectedValue({ code: 123123 })
      expect(service.createUser(createUserDto)).rejects.toThrow(InternalServerErrorException)
    })
  })
  
  describe('getAll', () => {
    it('should return an array of usersView', async () => {  
      repo.find.mockResolvedValue(userArray)    
      const users = await service.getAllUsers();
      expect(users).toEqual(userViewArray);
    });
  });

  describe('getUserById', () => {
    it('should get one user', async () => {
      repo.findOne.mockResolvedValue(oneUser)
      const user = await service.getUserById("507f1f77bcf86cd799439011");
      expect(user).toEqual(oneUserView)
    });
    
    it('should throw an exception not found', async () => {
      expect(service.getUserById("507f1f77bcf86cd799439011")).rejects.toThrow(NotFoundException)
    })
  })

  describe('getUserByEmail', () => {
    it('should get one user by mail', async () => {
      repo.findOne.mockResolvedValue(oneUser)
      const user = await service.getUserByEmail("antoine.depoirier33@test.com");
      expect(user).toEqual(oneUser)
    })

    it('should throw an exception', async () => {
      expect(service.getUserByEmail("antoine.depoirier33@test.com")).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('updateUserById', () => {
    it('should update a user', async () => {
      repo.findOne.mockResolvedValue(oneUser)
      let updateDto = new UpdateUserDto();
      updateDto.firstname = "lol"
      await service.updateUserById("1", updateDto)
      expect(repo.update).toHaveBeenCalledWith("1", updateDto);
    })
  })

  describe('updateUserPasswordById', () => {
    it("should update user's password", async () => {
      repo.findOne.mockResolvedValue(oneUser)
      let updatePasswordDto = new UpdatePasswordUserDto();
      updatePasswordDto.password = "lol"
      await service.updateUserPasswordById("1", updatePasswordDto);
      expect(repo.update).toHaveBeenCalled();
    })
  })

  describe('deleteUserById', () => {
    it('should delete one user by id', async () => {
      repo.delete.mockResolvedValue({ affected: 1 });
      const deleted = await service.deleteUserById('an id')
      expect(repo.delete).toHaveBeenCalledWith('an id')
      expect(deleted).toEqual({ deleted: true })
    })

    it('should fail delete', async () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValue("error")
      const deleted = await service.deleteUserById('a bad id')
      expect(deleted).toEqual({ deleted: false, message: "error" })
    })
  })
});