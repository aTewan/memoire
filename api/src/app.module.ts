import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'
import { typeOrmConfig } from './config/typeorm.config';
import { SalesModule } from './sales/sales.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { DeezerModule } from './deezer/deezer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    SalesModule,
    DiscussionsModule,
    DeezerModule
  ],
})
export class AppModule {}
