import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const port = +process.env.MONGO_PORT
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const hostname = process.env.MONGO_HOSTNAME

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: hostname,
  port: port,
  database: 'trepo',
  autoLoadEntities: true,
  synchronize: true,
  useUnifiedTopology: true
}