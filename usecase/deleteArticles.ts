import { DeletedArticle } from "./../domain/entities/deletedArticle.ts";
import { IArticleRepository } from "./../domain/repositories/articleRepository.ts";
import { FILE_PATH_PATTERN } from "./../domain/constant.ts";
import { UseCaseProcessor } from "./usecase.ts";

const extractArticleCodeFrom = (filePath: string): string => {
  const matchedGroups = filePath.match(FILE_PATH_PATTERN)?.groups;
  if (matchedGroups === undefined) throw "Invalid article code.";
  return matchedGroups.articleCode;
};

export class DeleteArticlesUseCase implements UseCaseProcessor {
  constructor(
    private filePaths: string[],
    private articleRepository: IArticleRepository,
  ) {}

  async run() {
    for (const filePath of this.filePaths) {
      const articleCode = extractArticleCodeFrom(filePath);
      const articleId = this.articleRepository.getId(articleCode);
      const deletedArticle = new DeletedArticle(articleId, articleCode);
      await this.articleRepository.save(deletedArticle);
      console.log("Succeeded deleting article:", deletedArticle);
    }
  }
}
