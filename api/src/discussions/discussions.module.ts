import { Module, NestModule, MiddlewareConsumer, forwardRef, RequestMethod } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateMessage } from './pm.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

const timeExp: number = 3600*1000*24*30

@Module({
  imports: [TypeOrmModule.forFeature([PrivateMessage]),
  AuthModule,
  forwardRef(() => UsersModule),
  forwardRef(() => JwtModule.register({
    secret: "le-secret-lol",
    signOptions: {
      expiresIn: timeExp
    }
  })),],
  providers: [DiscussionsService],
  controllers: [DiscussionsController]
})
export class DiscussionsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'discussions', method: RequestMethod.POST}, { path: 'discussions', method: RequestMethod.GET })
  }
}
