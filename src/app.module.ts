import pino from "pino";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { LoggerModule } from "nestjs-pino";
import { ConfigModule } from "@nestjs/config";
import { LogModule } from "./log/log.module";
import { LogMiddleware } from "./log/log.middleware";

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
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogMiddleware).forRoutes({
      method: RequestMethod.ALL,
      path: "*",
    });
  }
}
