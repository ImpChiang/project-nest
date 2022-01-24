import { Injectable } from '@nestjs/common';
 //Provider 只是一个用 @Injectable() 装饰器注释的类
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!iiii';
  }
}
