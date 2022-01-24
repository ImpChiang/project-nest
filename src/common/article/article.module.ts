import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleService } from "./article.service";
import { Articles } from './article.entity'
import { ArticleController } from './article.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})

export class ArticleModule{}
