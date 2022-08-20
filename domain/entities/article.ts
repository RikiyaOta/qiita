import { RawArticle } from "./rawArticle.ts";

export interface IArticleRepository {
  save(article: Article): Article;
}

type ArticleTag = {
  name: string;
  versions: string[];
};

export class Article {
  public id?: string;
  public code: string;
  public title: string;
  public tags: ArticleTag[];
  public private: boolean;
  public body: string;

  constructor(rawArticle: RawArticle) {
    if (!rawArticle.isValid()) throw "This rawArticle is not valid!";

    this.code = rawArticle.getCode();
    this.title = rawArticle.getTitle();
    this.tags = rawArticle.getTags();
    this.private = rawArticle.getPrivate();
    this.body = rawArticle.getBody();
  }
}
