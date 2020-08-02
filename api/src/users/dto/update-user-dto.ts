import { IsNotEmpty } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiPropertyOptional({ example: "John", description: "Prénom de l'utilisateur"})
  public firstname: string;

  @ApiPropertyOptional({ example: "Doe", description: "Nom de famille de l'utilisateur"})
  public lastname: string;

  @ApiPropertyOptional({ example: "10 rue de la Merci", description: "Adresse de l'utilisateur"})
  public address: string;

  @ApiPropertyOptional({ example: "Bordeaux", description: "Ville de l'utilisateur"})
  public city: string;

  @ApiPropertyOptional({ example: "33000", description: "Code postal de l'utilisateur"})
  public zipcode: string;

  @ApiPropertyOptional({ example: "France", description: "Pays de l'utilisateur"})
  public country: string;
}