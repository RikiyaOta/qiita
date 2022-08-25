import { CreatedArticle } from "./../entities/createdArticle.ts";
import { ModifiedArticle } from "./../entities/modifiedArticle.ts";
import { DeletedArticle } from "./../entities/deletedArticle.ts";

export type Article = CreatedArticle | ModifiedArticle | DeletedArticle;

export interface IArticleRepository {
  getId(articleCode: string): string;
  save(article: Article): Promise<Article>;
}
