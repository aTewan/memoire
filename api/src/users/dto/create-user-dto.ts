import { IsNotEmpty, IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: "John", description: "Prénom de l'utilisateur"})
  firstname: string;
  
  @ApiProperty({ example: "Doe", description: "Nom de famille de l'utilisateur"})
  lastname: string;

  @ApiProperty({ example: "xXx_D03_xXx", description: "Pseudo de l'utilisateur"})
  @IsNotEmpty()
  nickname: string;
  
  @ApiProperty({ example: "john.doe@test.com", description: "E-mail de l'utilisateur"})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password", description: "Mot de passe non-hashé de l'utilisateur" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "10 rue de la Merci", description: "Adresse de l'utilisateur"})
  address: string;

  @ApiProperty({ example: "Bordeaux", description: "Ville de l'utilisateur"})
  city: string;

  @ApiProperty({ example: "33000", description: "Code postal de l'utilisateur"})
  zipcode: string;

  @ApiProperty({ example: "France", description: "Pays de l'utilisateur"})
  country: string;
}