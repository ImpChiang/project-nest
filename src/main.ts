import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  app.setGlobalPrefix('api');  // 要为应用程序中的每个路由设置前缀, 让我们使用 INestApplication 对象的 setGlobalPrefix() 方法。
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(9900);
}
bootstrap();
