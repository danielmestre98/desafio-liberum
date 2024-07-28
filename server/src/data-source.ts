import "reflect-metadata"
import { DataSource } from "typeorm"
import { Empresas } from "./entity/Empresas"
import * as dotenv from 'dotenv'

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Empresas],
    migrations: [],
    subscribers: [],
})
