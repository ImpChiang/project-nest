// 管道有两个类型:
//
// 转换：管道将输入数据转换为所需的数据输出；
// 验证：对输入数据进行验证，如果验证成功继续传递，验证失败则抛出异常；
// ValidationPipe 是 Nest.js 自带的三个开箱即用的管道之一（另外两个是 ParseIntPipe 和 ParseUUIDPipe，现在还用不到）。
// 每个管道必须提供 transform() 方法。 这个方法有两个参数：
//
// value
// metadata
// value 是当前处理的参数，而 metadata 是其元数据。
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from "class-validator"; // 数据验证
import { plainToClass } from "class-transformer"; // 转换
import { Logger } from "../utils/log4js";

@Injectable()
export class ValidationPipes implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(`value:`, value, 'metatype: ', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype,value) //转换 JavaScript 的参数为可验证的类型对象,一个请求中的 body 数据是不包含类型信息的，Class-validator 需要使用前面定义过的 DTO，就需要做一个类型转换。
    const errors = await validate(object)
    console.log(errors,'pipe------error')
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      Logger.error(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
