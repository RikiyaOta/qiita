import { CreatedArticle } from "./../domain/entities/createdArticle.ts";
import { IArticleRepository } from "./../domain/repositories/articleRepository.ts";
import { IRawArticleRepository } from "./../domain/repositories/rawArticleRepository.ts";
import { UseCaseProcessor } from "./usecase.ts";

export class CreateArticlesUseCase implements UseCaseProcessor {
  constructor(
    private filePaths: string[],
    private rawArticleRepository: IRawArticleRepository,
    private articleRepository: IArticleRepository,
  ) {}

  async run() {
    for (const filePath of this.filePaths) {
      const rawArticle = this.rawArticleRepository.get(filePath);
      const createdArticle = new CreatedArticle(rawArticle);
      await this.articleRepository.save(createdArticle);
      console.log("Succeeded creating article:", createdArticle);
    }
  }
}
