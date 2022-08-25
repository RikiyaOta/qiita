import { RawArticle } from "./../../domain/entities/rawArticle.ts";
import { IRawArticleRepository } from "./../../domain/repositories/rawArticleRepository.ts";

export class RawArticleRepository implements IRawArticleRepository {
  get(filePath: string): RawArticle {
    const fileContent = Deno.readTextFileSync(filePath);
    return new RawArticle(filePath, fileContent);
  }
}
