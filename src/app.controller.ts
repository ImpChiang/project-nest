import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('lesson-one')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello-world')
  // @HttpCode(205)
  getHello(): string {
    return this.appService.getHello();
  }
}
