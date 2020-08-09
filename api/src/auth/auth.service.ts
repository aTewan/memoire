import { Injectable, UnauthorizedException, GoneException, BadRequestException, BadGatewayException, ServiceUnavailableException, HttpService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login-dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<{token: string}> {
    const { email, password } = loginDto
    const url = "http://mc-users-srv:4000/users/" + email;
    const res: any = await this.httpService.get(url).toPromise();
    let passwordCorrespondance = await bcrypt.compare(password, res.data.password)
    if (passwordCorrespondance) {
      const payload = { id: res.data._id }
      console.log(payload);
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
}
