import path from "path"
import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()

export const conn = new DataSource({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '../entities/*{.ts,.js}')],
  synchronize: JSON.parse(process.env.SYNC!),
  type: 'mysql'
})