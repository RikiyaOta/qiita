import {
  isValidUseCaseType,
  UseCaseProcessor,
  UseCaseType,
} from "./usecase/usecase.ts";
import { CreateArticlesUseCase } from "./usecase/createArticles.ts";
import { CopyArticlesUseCase } from "./usecase/copyArticles.ts";
import { ModifyArticlesUseCase } from "./usecase/modifyArticles.ts";
import { RenameArticlesUseCase } from "./usecase/renameArticles.ts";
import { DeleteArticlesUseCase } from "./usecase/deleteArticles.ts";
import { RawArticleRepository } from "./infrastructure/repositories/rawArticleRepository.ts";
import { ArticleRepository } from "./infrastructure/repositories/articleRepository.ts";

const [useCaseType, ...filePaths] = Deno.args;

if (!isValidUseCaseType(useCaseType)) {
  throw `Invalid usecase type: ${useCaseType}`;
}

const buildUseCaseProcessor = (useCaseType: UseCaseType): UseCaseProcessor => {
  switch (useCaseType) {
    case "CREATE_ARTICLE":
      return new CreateArticlesUseCase(
        filePaths,
        new RawArticleRepository(),
        new ArticleRepository(),
      );
    case "COPY_ARTICLE":
      return new CopyArticlesUseCase(filePaths);
    case "MODIFY_ARTICLE":
      return new ModifyArticlesUseCase(
        filePaths,
        new RawArticleRepository(),
        new ArticleRepository(),
      );
    case "RENAME_ARTICLE":
      return new RenameArticlesUseCase(filePaths);
    case "DELETE_ARTICLE":
      return new DeleteArticlesUseCase(
        filePaths,
        new ArticleRepository(),
      );
  }
};

const useCaseProcessor = buildUseCaseProcessor(useCaseType as UseCaseType);

await useCaseProcessor.run();
