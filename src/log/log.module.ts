import { Module } from "@nestjs/common";
import { LogMiddleware } from "./log.middleware";

@Module({
  providers: [LogMiddleware],
  exports: [LogMiddleware],
})
export class LogModule {}
