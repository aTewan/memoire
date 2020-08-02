import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
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
    forwardRef(() => UsersModule) 
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
