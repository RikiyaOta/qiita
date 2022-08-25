import { RawArticle } from "./rawArticle.ts";

export class CreatedArticle {
  public code: string;
  public title: string;
  public tags: [{ name: string; versions: string[] }];
  public private: boolean;
  public body: string;

  constructor(rawArticle: RawArticle) {
    if (!rawArticle.isValid()) throw "This rawArticle is not valid!";

    this.code = rawArticle.getCode();
    this.title = rawArticle.getTitle();
    this.tags = rawArticle.getTags();
    this.private = rawArticle.getPrivate();
    this.body = rawArticle.getBody();
  }
}
