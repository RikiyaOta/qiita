import { RawArticle } from "./../entities/rawArticle.ts";

export interface IRawArticleRepository {
  get(filePath: string): RawArticle;
}
