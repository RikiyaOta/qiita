import { UseCaseProcessor } from "./usecase.ts";

export class CopyArticlesUseCase implements UseCaseProcessor {
  constructor(private filePaths: string[]) {}

  async run() {
    await new Promise((resolve) => resolve("TODO"));
    return undefined;
  }
}
