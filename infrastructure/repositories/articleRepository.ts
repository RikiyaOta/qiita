import ky from "https://cdn.skypack.dev/ky?dts";
import {
  Article,
  IArticleRepository,
} from "./../../domain/repositories/articleRepository.ts";
import { CreatedArticle } from "./../../domain/entities/createdArticle.ts";
import { ModifiedArticle } from "./../../domain/entities/modifiedArticle.ts";
import { DeletedArticle } from "./../../domain/entities/deletedArticle.ts";

const QIITA_ACCESS_TOKEN = Deno.env.get("QIITA_ACCESS_TOKEN");
const BASE_HEADERS = { Authorization: `Bearer ${QIITA_ACCESS_TOKEN}` };

const postToQiita = (article: CreatedArticle) => {
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

const patchToQiita = (article: ModifiedArticle) => {
  const url = `https://qiita.com/api/v2/items/${article.id}`;
  const requestBody = {
    body: article.body,
    private: article.private,
    tags: article.tags,
    title: article.title,
  };

  return ky.patch(url, { headers: BASE_HEADERS, json: requestBody });
};

const deleteToQiita = (article: DeletedArticle) => {
  const url = `https://qiita.com/api/v2/items/${article.id}`;
  return ky.delete(url, { headers: BASE_HEADERS });
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
    }),
  );
};

const addArticleMapping = (id: string, code: string) => {
  const articleMapping = `${id},${code}\n`;
  Deno.writeTextFileSync(MAPPING_FILE_PATH, articleMapping, { append: true });
};

const deleteArticleMapping = (id: string, code: string) => {
  const [headerLine, ...bodyLines] = Deno.readTextFileSync(MAPPING_FILE_PATH)
    .split("\n");
  const newBodyLines = bodyLines.filter(
    (bodyLine) => bodyLine !== `${id},${code}`,
  );
  const newFileContent = [headerLine, ...newBodyLines].join("\n");
  Deno.writeTextFileSync(MAPPING_FILE_PATH, newFileContent);
};

export class ArticleRepository implements IArticleRepository {
  getId(articleCode: string): string {
    const articleMappings = getArticleMappings();
    const articleId = articleMappings.get(articleCode);
    if (articleId === undefined) throw "Not found article id.";
    else return articleId;
  }

  save(article: CreatedArticle): Promise<CreatedArticle>;
  save(article: ModifiedArticle): Promise<ModifiedArticle>;
  save(article: DeletedArticle): Promise<DeletedArticle>;
  async save(article: Article): Promise<Article> {
    if (article instanceof CreatedArticle) {
      const { id } = await postToQiita(article);
      addArticleMapping(id, article.code);
    }
    if (article instanceof ModifiedArticle) {
      await patchToQiita(article);
    }
    if (article instanceof DeletedArticle) {
      await deleteToQiita(article);
      deleteArticleMapping(article.id, article.code);
    }

    return article;
  }
}
