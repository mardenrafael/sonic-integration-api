import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(LogMiddleware.name);

  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers["user-agent"];
    const method = req.method;
    const hostName = req.hostname;
    const pathName = req.path;

    this.logger.log(`${method} [${userAgent}] [${hostName}] ${pathName}`);
    next();
  }
}
