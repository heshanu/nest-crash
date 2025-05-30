/* eslint-disable prettier/prettier */
import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  
  constructor(private appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hi')
  getHi():string{
    return "Hi";
  }

}
