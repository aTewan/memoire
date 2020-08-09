import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'

const timeExp: number = 3600*1000*24*30

@Module({
  imports: [
    JwtModule.register({
      secret: "le-secret-lol",
      signOptions: {
        expiresIn: timeExp
      }
    }),
    HttpModule
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
