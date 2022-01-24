//  传统意义上的控制器，提供 api 接口，负责处理路由、中转、验证等一些简洁的业务；
// 不要往 Controller 里面添加乱七八糟的东西，尤其不要在里面写业务逻辑，
// Controller 就应该保持简洁、干净。很多前端刚写 Node 的时候，都喜欢在这里面写逻辑，只为了省事，殊不知这对后期的维护是个灾难
import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { UserService } from './user.service'
import { AuthService } from "../auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { ValidationPipes } from "../../pipe/validation.pipe"; // 引入管道
import { RegisterInfoDTO } from './user.dto'; // 引入 DTO

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {
  }
  @Post('login')
  async login(@Body() body: any) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(body.mobile,body.password)
    // console.log(authResult,'authResult-------------');
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user)
      case 0:
        return {
          code: 500,
          msg: `账号或密码错误`
        }
      default:
        return {
          code: 600,
          msg: authResult.msg
        }
    }
  }
  // @UseGuards(AuthGuard('jwt')) //// 使用 'JWT' 进行验证
  @UsePipes(new ValidationPipes()) // 使用管道验证
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) { // 指定 DTO类型
    return await this.userService.register(body)
  }

  @Post('find-son')
  findSon(@Body() body: any) { //  @Body() 获取请求体(request.body)得参数
    return this.userService.findSon(body.mobile)
  }
  @Post('find-one')
  findOne(@Body() body:any) {
    return this.userService.findOne()
  }
}
