import { IsNotEmpty, IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({description: "E-mail de l'utilisateur", type: "string"})
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({description: "Mot de passe de l'utilisateur", type: "string"})
  @IsNotEmpty()
  password: string
}