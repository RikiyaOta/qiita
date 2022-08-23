import { UseCaseProcessor } from "./usecase.ts";

export class RenameArticlesUseCase implements UseCaseProcessor {
  constructor(private filePaths: string[]) {}

  async run() {
    await new Promise((resolve) => resolve("TODO"));
    return undefined;
  }
}
