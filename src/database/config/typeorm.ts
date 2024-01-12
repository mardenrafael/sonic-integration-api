import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";

import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".env" });

const config = {
  type: "postgres",
  host: "10.1.0.1",
  port: `${process.env.POSTGRES_PORT}`,
  username: "postgres",
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  entities: ["./dist/**/*.entity.js"],
  migrations: ["./dist/database/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
