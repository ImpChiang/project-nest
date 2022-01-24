// 管道也可以将输入数据转换为所需的输出,从 transform 函数返回的值完全覆盖了参数先前的值
import { ArgumentMetadata, Injectable, PipeTransform,BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata):number {
    const val = parseInt(value, 10)
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed')
    }
    return val;
  }
}
