import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeOrmConfig } from './config/typeorm.config';
import { SalesModule } from './sales/sales.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { DeezerModule } from './deezer/deezer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    SalesModule,
    DiscussionsModule,
    DeezerModule
  ],
})
export class AppModule {}
