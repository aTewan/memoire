import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiUnauthorizedResponse, ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { TokenDto } from './dto/token-dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authServices: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({description: "Connexion réussie"})
  @ApiUnauthorizedResponse({description: "L'email n'existe pas"})
  @ApiUnauthorizedResponse({description: "Le mot de passe ne correspond pas"})
  async login(@Body() loginDto: LoginDto): Promise<{token: string}> {
    return await this.authServices.login(loginDto);
  }

  @Post('token')
  async verifyToken(@Body() tokenDto: TokenDto) {
    return await this.authServices.verifyToken(tokenDto.token);
  }

  @Post('whoami')
  async whoami(@Body() tokenDto: TokenDto) {
    return await this.authServices.whoAmI(tokenDto.token)
  }
}
