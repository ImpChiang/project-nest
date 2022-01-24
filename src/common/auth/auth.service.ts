import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { JwtService } from "@nestjs/jwt";
import { encryptPassword } from "../../utils/cryptogram";

@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService, private readonly jwtservice: JwtService) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(mobile: number,password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findSon(mobile)
    // console.log(user.data.user,'JWT验证 - Step 2: 校验用户信息---user');
    if (user.code == 200) {
      const data = user.data.user
      const hashedPassword = data.password // 已存数据库密码
      const salt = data.salt
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password,salt)
      if (hashedPassword === hashPassword) { // 密码正确
        return {
          code: 1,
          user:data,
        }
      } else { // 密码错误
        return {
          code: 0,
          user: null,
          msg: '密码错误'
        }
      }
    }
    // 未查到用户信息
    return {
      code: 500,
      msg: '您未注册，请注册'
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证 生成用户token
  async certificate(user: any) {
    const payload = {mobile: user.mobile, sub: user.userId, realName: user.realName, role: user.role}
    // console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtservice.sign(payload)
      return{
        code: 200,
        data: {
          token
        },
        msg: '登陆成功'
      }
    } catch (error) {
      return {
        code: 501,
        msg: '账号或密码错误'
      }
    }
  }
}
