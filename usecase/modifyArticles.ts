import { ModifiedArticle } from "./../domain/entities/modifiedArticle.ts";
import { IArticleRepository } from "./../domain/repositories/articleRepository.ts";
import { IRawArticleRepository } from "./../domain/repositories/rawArticleRepository.ts";
import { UseCaseProcessor } from "./usecase.ts";

export class ModifyArticlesUseCase implements UseCaseProcessor {
  constructor(
    private filePaths: string[],
    private rawArticleRepository: IRawArticleRepository,
    private articleRepository: IArticleRepository,
  ) {}

  async run() {
    for (const filePath of this.filePaths) {
      const rawArticle = this.rawArticleRepository.get(filePath);
      const articleId = this.articleRepository.getId(rawArticle.getCode());
      const modifiedArticle = new ModifiedArticle(articleId, rawArticle);
      await this.articleRepository.save(modifiedArticle);
      console.log("Succeeded modifying article:", modifiedArticle);
    }
  }
}
