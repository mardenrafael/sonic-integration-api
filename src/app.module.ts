import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "nestjs-pino";
import pino from "pino";
import { DatabaseModule } from "./database/database.module";
import { HealthModule } from "./health/health.module";
import { LogMiddleware } from "./log/log.middleware";
import { LogModule } from "./log/log.module";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";
import typeorm from "./database/config/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        useLevel: "info",
        stream: pino.destination({
          dest: process.env.LOG_PATH || process.stdout.fd,
          sync: true,
        }),
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    HealthModule,
    LogModule,
    DatabaseModule,
    UserModule,
    PostModule,
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
