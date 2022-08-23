import ky from "https://cdn.skypack.dev/ky?dts";
import {
  Article,
  IArticleRepository,
} from "./../../domain/entities/article.ts";

const QIITA_ACCESS_TOKEN = Deno.env.get("QIITA_ACCESS_TOKEN");
const BASE_HEADERS = { Authorization: `Bearer ${QIITA_ACCESS_TOKEN}` };

const postToQiita = (article: Article) => {
  const url = "https://qiita.com/api/v2/items";
  const requestBody = {
    body: article.body,
    private: article.private,
    tags: article.tags,
    title: article.title,
  };

  return ky
    .post(url, { headers: BASE_HEADERS, json: requestBody })
    .json<{ id: string }>();
};

const patchToQiita = (article: Article) => {
  const url = `https://qiita.com/api/v2/items/${article.id}`;
  const requestBody = {
    body: article.body,
    private: article.private,
    tags: article.tags,
    title: article.title,
  };

  return ky.patch(url, { headers: BASE_HEADERS, json: requestBody });
};

const MAPPING_FILE_PATH = "./article_mappings.csv";

type ARTICLE_ID = string;
type ARTICLE_CODE = string;
const getArticleMappings = (): Map<ARTICLE_CODE, ARTICLE_ID> => {
  const fileContent = Deno.readTextFileSync(MAPPING_FILE_PATH);
  const [, ...recordStrArray] = fileContent.split("\n").filter((s) => s !== "");
  return new Map(
    recordStrArray.map((recordStr) => {
      const [id, code] = recordStr.split(",");
      return [code, id];
    })
  );
};

const addArticleMapping = (article: Article) => {
  const { id, code } = article;
  const articleMapping = `${id},${code}\n`;
  Deno.writeTextFileSync(MAPPING_FILE_PATH, articleMapping, { append: true });
};

export class ArticleRepository implements IArticleRepository {
  getId(article: Article): string | null {
    const { code: articleCode } = article;
    const articleMappings = getArticleMappings();
    const articleId = articleMappings.get(articleCode);
    if (articleId === undefined) return null;
    else return articleId;
  }

  async save(article: Article): Promise<Article> {
    if (article.id) {
      await patchToQiita(article);
      return article;
    } else {
      const { id } = await postToQiita(article);
      article.id = id;
      addArticleMapping(article);
      return article;
    }
  }
}
