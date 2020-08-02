import { Injectable, UnauthorizedException, GoneException, BadRequestException, BadGatewayException, ServiceUnavailableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login-dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private usersServices: UsersService,
    private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<{token: string}> {
    const { email, password } = loginDto
    const userFound = await this.usersServices.getUserByEmail(email);
    let passwordCorrespondance = await bcrypt.compare(password, userFound.password)
    if (passwordCorrespondance) {
      const payload = { id: userFound.id }
      const accessToken: string = await this.jwtService.sign(payload)
      return { token: accessToken }
    } else {
      throw new UnauthorizedException('WRONG_PASSWORD')
    }
  }

  async verifyToken(token: string) {
    try {
      let id = await this.jwtService.verify(token).id
      console.log(id)
      const newToken: string = await this.jwtService.sign({ id: id});
      return { token: newToken }
    }
    catch(err) {
      console.log(err)
      throw new BadRequestException()
    }
  }

  async whoAmI(token: string) {
    if (token) {
      let id = await this.jwtService.verify(token).id
      const user = await this.usersServices.getUserById(id);
      return user
    }
  }
}
