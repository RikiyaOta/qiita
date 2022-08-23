import { Article, IArticleRepository } from "./../domain/entities/article.ts";
import { IRawArticleRepository } from "./../domain/entities/rawArticle.ts";
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
      const article = new Article(rawArticle);
      const createdArticle = await this.articleRepository.save(article);
      console.log("Succeeded creating article:", createdArticle);
    }
  }
}
