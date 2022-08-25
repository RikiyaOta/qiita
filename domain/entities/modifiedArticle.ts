import { RawArticle } from "./rawArticle.ts";

export class ModifiedArticle {
  public id: string;
  public code: string;
  public title: string;
  public tags: [{ name: string; versions: string[] }];
  public private: boolean;
  public body: string;

  constructor(id: string, rawArticle: RawArticle) {
    if (!rawArticle.isValid()) throw "This rawArticle is not valid!";

    this.id = id;
    this.code = rawArticle.getCode();
    this.title = rawArticle.getTitle();
    this.tags = rawArticle.getTags();
    this.private = rawArticle.getPrivate();
    this.body = rawArticle.getBody();
  }
}
