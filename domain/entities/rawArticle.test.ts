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

    # Second Paragraph

    fugafuga
    `;

    const rawArticle = new RawArticle(filePath, fileContent);
    assert(rawArticle.isValid());
  });
});
