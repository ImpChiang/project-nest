import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from "typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './common/user/user.module';
import { AuthModule } from './common/auth/auth.module';
import { UserController } from "./common/user/user.controller";
// import { CommodityService } from './common/commodity/commodity.service';
// import { CommodityController } from './common/commodity/commodity.controller';
import { AppResolver } from './app.resolver';
import { ArticleModule } from "./common/article/article.module";
// import { fileModule } from "./common/file/file.module";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule,ArticleModule,
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "120.25.217.217",
      "port": 3306,
      "username": "nestjs-root",
      "password": "YAEaLMNHG37GrkeX",
      "database": "nestjs-root",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    GraphQLModule.forRoot({
      // 自动生成schema.graphql文件
      autoSchemaFile: 'src/schema.gql'
    }),
    ConfigModule.forRoot()
  ], // 导入模块的列表，这些模块导出了此模块中所需提供者
  controllers: [AppController,UserController], // 必须创建的一组控制器
  providers: [AppService,AppResolver], //  由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
})
export class AppModule {}
