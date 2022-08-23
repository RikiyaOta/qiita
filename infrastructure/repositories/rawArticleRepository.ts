import {
  IRawArticleRepository,
  RawArticle,
} from "./../../domain/entities/rawArticle.ts";

export class RawArticleRepository implements IRawArticleRepository {
  get(filePath: string): RawArticle {
    const fileContent = Deno.readTextFileSync(filePath);
    return new RawArticle(filePath, fileContent);
  }
}
