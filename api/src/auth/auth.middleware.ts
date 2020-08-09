import { NestMiddleware, Injectable, Inject, forwardRef, UnauthorizedException, HttpService } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request, Response ,NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    console.log("AUTHORIZATION HEADER :")
    console.log(authHeaders);
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = this.jwtService.verify(token);
      const url = "http://mc-users-srv:4000/user/" + decoded.id;
      const res: any = await this.httpService.get(url).toPromise();
      const user = res.data

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