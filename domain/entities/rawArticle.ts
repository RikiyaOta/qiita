export interface IRawArticleRepository {
  get(filePath: string): RawArticle;
}

export class RawArticle {
  private content: string;
  private code: string;

  constructor(filePath: string) {
    // TODO
    // メモ：一応articles/*.md を想定してるけど、articles/**/*.md もいけたらそうしたい。
    this.code = "";
    this.content = "";
  }

  isValid(): boolean {
    // TODO
    return false;
  }

  getCode(): string {
    // TODO
    return "";
  }

  getTitle(): string {
    // TODO
    return "";
  }

  getTags(): [{ name: string; versions: string[] }] {
    // TODO
    return [{ name: "", versions: [""] }];
  }

  getPrivate(): boolean {
    // TODO:
    return true;
  }

  getBody(): string {
    // TODO
    return "";
  }
}
