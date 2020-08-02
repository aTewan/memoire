import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePasswordUserDto {
  @ApiProperty({description: "Nouveau mot de passe de l'utilisateur", type: "string"})
  @IsNotEmpty()
  password: string
}