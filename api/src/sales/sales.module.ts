import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './sale.entity';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

const timeExp: number = 3600*1000*24*30

@Module({
  imports: [TypeOrmModule.forFeature([Sale]),
  AuthModule,
  forwardRef(() => UsersModule),
  forwardRef(() => JwtModule.register({
    secret: "le-secret-lol",
    signOptions: {
      expiresIn: timeExp
    }
  })),],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService]
})
export class SalesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'sales', method: RequestMethod.POST})
  }
}
