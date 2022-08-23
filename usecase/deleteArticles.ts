import { UseCaseProcessor } from "./usecase.ts";

export class DeleteArticlesUseCase implements UseCaseProcessor {
  constructor(private filePaths: string[]) {}

  async run() {
    await new Promise((resolve) => resolve("TODO"));
    return undefined;
  }
}
