// RBAC：基于角色的权限访问控制（Role-Based Access Control）
// RBAC 模型可以分为：RBAC 0、RBAC 1、RBAC 2、RBAC 3 四种。 其中 RBAC 0 是基础，也是最简单的，相当于底层逻辑。RBAC 1、RBAC 2、RBAC 3 都是以 RBAC 0 为基础的升级。
// RBAC 0
// 最简单的用户、角色、权限模型。这里面又包含了2种：
//
// 用户和角色是多对一关系，即：一个用户只充当一种角色，一种角色可以有多个用户担当。
// 用户和角色是多对多关系，即：一个用户可同时充当多种角色，一种角色可以有多个用户担当。
//
// 一般情况下，使用 RBAC 0 模型就可以满足常规的权限管理系统设计了。
import { CanActivate, ExecutionContext, Injectable,ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
// 守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权
//每个守卫必须实现一个canActivate()函数
// 此函数应该返回一个布尔值，指示是否允许当前请求。
// 它可以同步或异步地返回响应(通过 Promise 或 Observable)
// Nest使用返回值来控制下一个行为
// 如果返回 true, 将处理用户调用。
// 如果返回 false, 则 Nest 将忽略当前处理的请求

@Injectable()
export class RbacGuard implements CanActivate {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  constructor(private readonly role: number) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (user.role > this.role) {
      throw new ForbiddenException('对不起，您无权操作')
    }
    return true;
  }
}

//构造器里的 role: number 是通过路由传入的可配置参数，
// 表示必须小于等于这个数字的角色才能访问。通过获取用户角色的数字，和传入的角色数字进行比较即可。
