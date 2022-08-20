import { assert } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.152.0/testing/bdd.ts";

import { RawArticle } from "./rawArticle.ts";

describe("Test: RawArticle.isValid", () => {
  it("仕様通りの article", () => {
    const filePath = "articles/test-01.md";
    const fileContent = `-----
title: This is a test article.
tags: [{"name": "test", "versions": ["0.0.0"]}]
private: true
-----

# First Paragraph

hogehoge
`;
    const rawArticle = new RawArticle(filePath, fileContent);
    assert(rawArticle.isValid());
  });

  it("タイトルがない", () => {
    const filePath = "articles/test-02.md";
    const fileContent = `-----
tags: [{"name": "test", "versions": ["0.0.0"]}]
private: true
-----

# First Paragraph

hogehoge
`;
    const rawArticle = new RawArticle(filePath, fileContent);
    assert(!rawArticle.isValid());
  });

  it("タグのフォーマットが不正", () => {
    const filePath = "articles/test-03.md";
    const fileContent = `-----
title: This is a test article.
tags: [{"name": "test", "versions": "0.0.0"}]
private: true
-----

# First Paragraph

hogehoge
`;
    const rawArticle = new RawArticle(filePath, fileContent);
    assert(!rawArticle.isValid());
  });

  it("private が true/false 以外の値", () => {
    const filePath = "articles/test-04.md";
    const fileContent = `-----
title: This is a test article.
tags: [{"name": "test", "versions": ["0.0.0"]}]
private: hoge
-----

# First Paragraph

hogehoge
`;
    const rawArticle = new RawArticle(filePath, fileContent);
    assert(!rawArticle.isValid());
  });
});
