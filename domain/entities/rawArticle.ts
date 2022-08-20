export class RawArticle {
  constructor(private content: string) {}

  validate(): boolean {
    // TODO
    return false;
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

export class Article {
  public title: string;
  public tags: [{ name: string; versions: string[] }];
  public private: boolean;
  public body: string;

  constructor(rawArticle: RawArticle) {
    if (rawArticle.validate()) {
      this.title = rawArticle.getTitle();
      this.tags = rawArticle.getTags();
      this.private = rawArticle.getPrivate();
      this.body = rawArticle.getBody();
    } else {
      throw "This rawArticle is not valid!";
    }
  }
}
