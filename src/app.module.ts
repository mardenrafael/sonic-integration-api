import pino from "pino";
import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { LoggerModule } from "nestjs-pino";
import { ConfigModule } from "@nestjs/config";
import { LogModule } from "./log/log.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        useLevel: process.env.NODE_ENV === "development" ? "debug" : "info",
        stream: pino.destination({
          dest: process.env.NODE_LOG_PATH || process.stdout.fd,
          sync: true,
        }),
      },
    }),
    HealthModule,
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
