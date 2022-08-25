import { assert } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import {
  beforeAll,
  describe,
  it,
} from "https://deno.land/std@0.152.0/testing/bdd.ts";
import { RawArticle } from "./../domain/entities/rawArticle.ts";

const isMakrdownFile = (dirEntry: Deno.DirEntry): boolean => {
  return dirEntry.isFile && dirEntry.name.endsWith(".md");
};

describe("存在する articles が全て有効なものかテストする", () => {
  const rawArticles: RawArticle[] = [];
  beforeAll(() => {
    for (const dirEntry of Deno.readDirSync("articles/")) {
      if (isMakrdownFile(dirEntry)) {
        const filePath = `articles/${dirEntry.name}`;
        const fileContent = Deno.readTextFileSync(filePath);
        rawArticles.push(new RawArticle(filePath, fileContent));
      }
    }
  });

  it("全て有効である", () => {
    for (const rawArticle of rawArticles) {
      assert(rawArticle.isValid());
    }
  });
});
