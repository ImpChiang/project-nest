
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
// CallHandler是一个包装执行流的对象,不手动调用 handle() 方法，则主处理程序根本不会进行求值
@Injectable()
export class RbacInterceptor implements NestInterceptor {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  constructor(private readonly role: number) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    // console.log(req,'req====',this.role)
    if (req.user.role > this.role) {
      throw new ForbiddenException('对不起，您无权操作');
    }
    return next.handle();
  }
}

