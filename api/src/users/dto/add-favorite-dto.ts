import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddFavoriteDto {
  @ApiProperty({description: "L'id a ajouté dans les favoris", type: "number"})
  id: number;

  @ApiProperty({ description: "Titre du favori", type: "string" })
  title: string;

  @ApiProperty({ description: "Artiste du favori", type: "string" })
  artist: string;

  @ApiProperty({ description: "Cover du favori", type: "string" })
  cover: string;

  @ApiProperty({ description: "id du genre du favori", type: "string" })
  idGenre: string;
}