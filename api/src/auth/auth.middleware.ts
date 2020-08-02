import { NestMiddleware, Injectable, Inject, forwardRef, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { Request, Response ,NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    console.log("AUTHORIZATION HEADER :")
    console.log(authHeaders);
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = this.jwtService.verify(token);
      const user = await this.usersService.getUserById(decoded.id)

      if (!user) {
        throw new UnauthorizedException()
      }
      req.user = user
      next();
    }
    else {
      console.log("mdrr y a pas de token dans le authheader")
    }
  }
}