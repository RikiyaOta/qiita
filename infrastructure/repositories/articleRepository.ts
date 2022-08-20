import { Article, IArticleRepository } from "./../../domain/entities/article";

export class ArticleRepository implements IArticleRepository {
  save(article: Article): Article {
    // TODO: Qiita への記事アップロード
    // TODO: artilce に Qiita の id を追加する
    // TODO: mappings.csv への行の追加
    return article;
  }
}
