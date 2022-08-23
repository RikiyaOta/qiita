import { UseCaseProcessor } from "./usecase.ts";

export class ModifyArticlesUseCase implements UseCaseProcessor {
  constructor(private filePaths: string[]) {}

  run() {
    console.log("TODO");
  }
}
