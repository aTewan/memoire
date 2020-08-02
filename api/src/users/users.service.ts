import { Injectable, Get, Post, Body, NotFoundException, Inject, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto'
import { UpdatePasswordUserDto } from './dto/update-password-user-dto';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { Repository } from 'typeorm';
import { UserView, Favorite } from './user.model';
import { SalesService } from '../sales/sales.service';
import { AddFavoriteDto } from './dto/add-favorite-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private salesService: SalesService){}

  async getAllUsers(): Promise<UserView[]> {
    const users = await this.userRepository.find()
    return users.map(u => { return new UserView(u) });
  }

  async getUserById(id: string): Promise<UserView> {
    const userFound = await this.userRepository.findOne(id)
    if(!userFound) {
      throw new NotFoundException("USER_NOT_FOUND");
    }
    return new UserView(userFound);
  }

  async getUserByEmail(email: string): Promise<User> {
    const userFound = await this.userRepository.findOne({ where: { email: email } })
    if(!userFound) {
      throw new UnauthorizedException("EMAIL_NOT_FOUND")
    }
    return userFound;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserView> {
    const salt: string = await bcrypt.genSalt()
    const { email, password, firstname, lastname, nickname, address, city, zipcode, country } = createUserDto
    console.log("nickname", nickname)
    let passwordHashed = await bcrypt.hash(password, salt)
    let user = new User(email, passwordHashed, firstname, lastname, nickname, address, city, zipcode, country)
    console.log("user",)
    try {
      await this.userRepository.save(user)
      return new UserView(user)
    }
    catch(error) {
      if (error.code === 11000) {
        throw new ConflictException("EMAIL_ALREADY_EXISTS")
      }
      else {
        throw new InternalServerErrorException()
      }
    }
  }
    
  async deleteUserById(id: string) {
    try {
      await this.userRepository.delete(id)
      return { deleted: true }
    } catch(err) {
      return { deleted: false, message: err }
    }
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.getUserById(id)
    await this.userRepository.update(id, updateUserDto)
  }

  async updateUserPasswordById(id: string, updatePasswordUserDto: UpdatePasswordUserDto): Promise<void> {
    const salt: string = await bcrypt.genSalt()
    let user = await this.getUserById(id)
    let newPasswordHashed = await bcrypt.hash(updatePasswordUserDto.password, salt)
    await this.userRepository.update(id, { password: newPasswordHashed })
  }

  async getSalesByUserId(id: string) {
    return await this.salesService.getSalesByUserId(id);
  }

  async addFavorite(id: string, addFavoriteDto: AddFavoriteDto) {
    let user = await this.getUserById(id)
    let favorites: Favorite[];
    if (user.favorites == null) {
      favorites = [];
    } else {
      favorites = user.favorites;
    }
    let favorite: Favorite = new Favorite();
    favorite.id = addFavoriteDto.id;
    favorite.title = addFavoriteDto.title;
    favorite.artist = addFavoriteDto.artist;
    favorite.cover = addFavoriteDto.cover;
    favorite.idGenre = addFavoriteDto.idGenre
    favorites.push(favorite);
    await this.userRepository.update(id, { favorites: favorites });
  }

  async unfavorite(id: string, addFavoriteDto: AddFavoriteDto) {
    let user = await this.getUserById(id)
    let favorites: Favorite[] = user.favorites;
    if (favorites !== null || favorites.length > 0) {
      let favorite: Favorite = new Favorite();
      favorite.id = addFavoriteDto.id;
      favorite.title = addFavoriteDto.title;
      favorite.artist = addFavoriteDto.artist;
      favorite.cover = addFavoriteDto.cover;
      favorite.idGenre = addFavoriteDto.idGenre
      if (this.isFavoriteInFavorites(favorites, favorite)) {
        const index: number = this.getIndexOfFavoriteInFavorites(favorites, favorite);
        favorites.splice(index, 1);
        await this.userRepository.update(id, { favorites: favorites })
      } else {
        throw new NotFoundException();
      }
    }
  }

  isFavoriteInFavorites(favorites: Favorite[], favorite: Favorite): boolean {
    for (let fav of favorites) {
      if (fav.id == favorite.id) {
        return true;
      }
    }
    return false;
  }

  getIndexOfFavoriteInFavorites(favorites: Favorite[], favorite: Favorite): number {
    for (let i = 0; i < favorites.length ; i++) {
      let fav = favorites[i];
      if (fav.id == favorite.id) {
        return i;
      }
    }
    return -1
  }
}
