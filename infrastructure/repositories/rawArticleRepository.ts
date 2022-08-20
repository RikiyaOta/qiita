import {
  RawArticle,
  IRawArticleRepository,
} from "./../../domain/entities/rawArticle";

export class RawArticleRepository implements IRawArticleRepository {
  get(filePath: string): RawArticle {
    // TODO
    return new RawArticle(filePath);
  }
}
