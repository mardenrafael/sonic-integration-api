import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  constructor() {}

  @Get("/check")
  public async check(): Promise<string> {
    return "check";
  }
}
