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

  return ky.post(url, { headers, json: requestBody }).json<{ id: string }>();
};

const MAPPING_FILE_PATH = "./article_mappings.csv";
const addMappingRecord = (article: Article) => {
  const { id, code } = article;
  const mappingRecord = `${id},${code}\n`;
  Deno.writeTextFileSync(MAPPING_FILE_PATH, mappingRecord, { append: true });
};

export class ArticleRepository implements IArticleRepository {
  async save(article: Article): Promise<Article> {
    const { id } = await postToQiita(article);
    article.id = id;
    addMappingRecord(article);
    return article;
  }
}
