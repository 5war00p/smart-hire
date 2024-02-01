import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT =
  process.env.DB_PORT !== undefined && !isNaN(parseInt(process.env.DB_PORT))
    ? parseInt(process.env.DB_PORT)
    : 3306;

if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !DB_HOST)
  throw new Error("Could find required Env!");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  dialectModule: mysql2,
});

export default sequelize;
