import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Articles } from "./article.entity";
import { Like, Repository } from "typeorm";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>
  ) {}

  async queryArticleList() {
    const list = await this.articlesRepository.find()
    console.log(list,'queryArticleList')
    list.forEach(v => {
      v.createTime = new Date(v.createTime).getTime()
      v.updateTime = new Date(v.updateTime).getTime()
    })
    return {
      code:200,
      data: list,
      msg: 'Success'
    }
  }

  /**
   * 添加文章
   */
  async createArticle(body: any):Promise<any> {
    const { title, content, abstract, isDraft } = body
    try {
      const articles = new Articles()
      articles.title = title
      articles.content = content
      articles.abstract = abstract
      articles.isDraft = isDraft
      articles.createTime = new Date().getTime()
      articles.updateTime = new Date().getTime()

      await this.articlesRepository.save(articles)

      return {
        code: 200,
        msg: '发布成功！'
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      }
    }
  }

  /**
   * 文章详情
   */
  async articleDetail(id: number):Promise<any> {
    const detail = await this.articlesRepository.find({
      'id': id
    })
    return {
      code: 200,
      data: detail[0] || null,
      msg: 'Success'
    }
  }
}
