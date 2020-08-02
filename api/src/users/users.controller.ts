import { Controller, Get, Post, Patch, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiNotFoundResponse, ApiAcceptedResponse, ApiOkResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserView } from './user.model'
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdatePasswordUserDto } from './dto/update-password-user-dto';
import { AddFavoriteDto } from './dto/add-favorite-dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  @ApiOkResponse({description: "Appel à la base de donnée réussie"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async getAllUsers(): Promise<UserView[]> {
    return await this.usersServices.getAllUsers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({description: "L'utilisateur a bien été enregistré"})
  @ApiConflictResponse({description: "Cet email est déjà utilisé"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserView> {
    return await this.usersServices.createUser(createUserDto);
  }

  @Get('/:id')
  @ApiOkResponse({description: "Un utilisateur a été trouvé", type: UserView})
  @ApiNotFoundResponse({description: "Aucun utilisateur trouvé"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async getUserById(@Param('id') id: string): Promise<UserView> {
    return await this.usersServices.getUserById(id);
  }

  @Patch('/:id')
  @ApiOkResponse({description: "L'utilisateur a bien été mis à jour"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async updateUserById(@Param('id') id: string, @Body() updateUserByDto: UpdateUserDto): Promise<void> {
    return await this.usersServices.updateUserById(id, updateUserByDto);
  }

  @Patch('/:id/password')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({description: "Le mot de passe de l'utilisateur a bien été mis à jour"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async updateUserPasswordById(@Param('id') id: string, @Body() updatePasswordUserDto: UpdatePasswordUserDto): Promise<void> {
    return await this.usersServices.updateUserPasswordById(id, updatePasswordUserDto);
  }

  @Delete('/:id')
  @ApiOkResponse({description: "Un utilisateur a été supprimé"})
  @ApiNotFoundResponse({description: "Aucun utilisateur trouvé"})
  @ApiInternalServerErrorResponse({description: "Internal Server Error"})
  async deleteUserById(@Param('id') id: string) {
    return await this.usersServices.deleteUserById(id);
  }

  @Get('/:id/sales')
  async getSalesByUserId(@Param('id') id: string) {
    return await this.usersServices.getSalesByUserId(id);
  }

  @Patch('/:id/favorite')
  @UsePipes(ValidationPipe)
  @ApiNoContentResponse({ description: "Le favori a été ajouté avec succès" })
  @ApiInternalServerErrorResponse({ description: "Internal Server Error" })
  async addFavorite(@Param('id') id: string, @Body() addFavoriteDto: AddFavoriteDto): Promise<void> {
    return await this.usersServices.addFavorite(id, addFavoriteDto)
  }

  @Patch('/:id/unfavorite')
  @UsePipes(ValidationPipe)
  async deleteFavorite(@Param('id') id: string, @Body() addFavoriteDto: AddFavoriteDto): Promise<void> {
    return await this.usersServices.unfavorite(id, addFavoriteDto);
  }
}
