import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TokenDto {
  @ApiProperty({description: "Token de l'utilisateur", type: "string"})
  @IsNotEmpty()
  token: string
}