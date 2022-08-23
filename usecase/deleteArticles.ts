import { Article, IArticleRepository } from "./../domain/entities/article.ts";
import { IRawArticleRepository } from "./../domain/entities/rawArticle.ts";
import { UseCaseProcessor } from "./usecase.ts";

export class DeleteArticlesUseCase implements UseCaseProcessor {
  constructor(
    private filePaths: string[],
    private rawArticleRepository: IRawArticleRepository,
    private articleRepository: IArticleRepository,
  ) {}

  async run() {
    for (const filePath of this.filePaths) {
      const rawArticle = this.rawArticleRepository.get(filePath);
      const article = new Article(rawArticle);
      const articleId = this.articleRepository.getId(article);
      if (articleId === null) {
        console.error(
          "Unexpected error. Not found article id. article:",
          article,
        );
      } else {
        article.id = articleId;
        const deletedArticle = await this.articleRepository.delete(article);
        console.log("Succeeded deleting article:", deletedArticle);
      }
    }
  }
}
