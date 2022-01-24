// 输出了一个类似于声明接口的 class，表明了参数名和类型，并且是只读的
import { IsNotEmpty, IsNumber, IsString, IsMobilePhone } from 'class-validator';

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string | number;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realName: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsMobilePhone('zh-CN')
  readonly mobile: number;
  readonly role?: string | number;
}


