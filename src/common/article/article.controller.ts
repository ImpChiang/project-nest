import { Controller, Body, Post, Get, Request } from "@nestjs/common";
import { ArticleService } from './article.service'

@Controller('article')
export class ArticleController{
  constructor(private readonly articleService: ArticleService) {
  }
  @Get('list')
  async getList(@Body() body: any) {
    return this.articleService.queryArticleList()
  }

  @Post('save')
  async articleSave(@Body() body:any) {
    return this.articleService.createArticle(body)
  }
  @Get('query')
  async queryDetail(@Request() req: any) {
    console.log(req,'req')
    return this.articleService.articleDetail(req.query.id)
  }
}
