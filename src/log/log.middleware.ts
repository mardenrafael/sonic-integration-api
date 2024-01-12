import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(LogMiddleware.name);

  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log("Teste");

    next();
  }
}
