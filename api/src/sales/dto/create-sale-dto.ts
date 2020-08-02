import { IsNotEmpty } from "class-validator";
import { RPM, State } from "../sale.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSaleDto {
  @ApiProperty({ example: "Vente vinyle", description: "Titre de la vente"})
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 33, enum: RPM, description: "Nombre de tour du vinyle" })
  @IsNotEmpty()
  rpm: RPM;

  @ApiProperty({ example: 19.99, description: "Prix de vente du vinyle" })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: "NEUF", enum: State, description: "État du vinyle" })
  @IsNotEmpty()
  state: State;

  @ApiProperty({ example: "description", description: "Description de la vente" })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 69, description: "Id correspondant à l'API Deezer" })
  idApi: number;

  @ApiProperty({ example: "Serge Gainsbourg", description: "Artiste dont le vinyle est mis en vente" })
  artist: string;

  @ApiProperty({ example: "url de photo", description: "URL de la photo de couverture" })
  cover: string;
}