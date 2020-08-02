import { IsNotEmpty } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { RPM, State } from '../sale.entity';

export class UpdateSaleDto {
  @ApiPropertyOptional({ example: "Titre", description: "Titre de la vente"})
  public title: string;

  @ApiPropertyOptional({ example: 33, enum: RPM, description: "Nombre de tour du vinyle" })
  public rpm: RPM;

  @ApiPropertyOptional({ example: 19.99, description: "Prix de vente du vinyle" })
  public price: number;

  @ApiPropertyOptional({ example: "NEUF", enum: State, description: "État du vinyle" })
  public state: State;

  @ApiPropertyOptional({ example: "description", description: "Description de la vente" })
  public description: string;
}