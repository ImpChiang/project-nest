// 在graphql中resolver叫解析器,主要包括query(查询数据)、mutation(增、删、改数据)、
// subscription(订阅，有点类型socket)，
// 在graphql项目中我们用resolver替换了之前的控制器
import { Resolver, Query } from '@nestjs/graphql';


@Resolver()
export class AppResolver {
  @Query(() => String)
  hello() {
    return 'hello world'
  }
}
