import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { RDBMS_MYSQL } from './constants'
import { Followes } from './entity/Followes'
import { Person } from './entity/Person'
import { Product } from './entity/Product'

export const AppDataSource = new DataSource({
  type: RDBMS_MYSQL,
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Person, Product,Followes],  //Order
  migrations: [],
  subscribers: [],
})
