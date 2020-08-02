import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePrivateMessageDto {
  @ApiProperty({ example: "", description: "Identifiant de l'utilisateur qui reçoit le message privé" })
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ example: "", description: "Identifiant de la vente qui a pour sujet le message privé" })
  @IsNotEmpty()
  saleId: string;

  @ApiProperty({ example: "cc, c'est cb ???", description: "Contenu du message privé" })
  @IsNotEmpty()
  content: string;
}