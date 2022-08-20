import ky from "https://cdn.skypack.dev/ky?dts";

import {
  Article,
  IArticleRepository,
} from "./../../domain/entities/article.ts";

const QIITA_ACCESS_TOKEN = Deno.env.get("QIITA_ACCESS_TOKEN");

const postToQiita = (article: Article) => {
  const url = "https://qiita.com/api/v2/items";
  const headers = { Authorization: `Bearer ${QIITA_ACCESS_TOKEN}` };
  const requestBody = {
    body: article.body,
    private: article.private,
    tags: article.tags,
    title: article.title,
  };

  return ky.post(url, { headers, json: requestBody }).json();
};

export class ArticleRepository implements IArticleRepository {
  async save(article: Article): Article {
    // TODO: Qiita への記事アップロード
    // TODO: artilce に Qiita の id を追加する
    // TODO: mappings.csv への行の追加
    const { id } = await postToQiita(article);
    article.id = id;
    return article;
  }
}
