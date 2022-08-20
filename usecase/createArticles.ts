// NOTE: テストしづらいなら外に出す
import { RawArticleRepository } from "./../infrastructure/repositories/rawArticleRepository.ts";
import { ArticleRepository } from "./../infrastructure/repositories/articleRepository.ts";
import { Article, IArticleRepository } from "./../domain/entities/article.ts";
import { IRawArticleRepository } from "./../domain/entities/rawArticle.ts";
const articleRepository: IArticleRepository = new ArticleRepository();
const rawArticleRepository: IRawArticleRepository = new RawArticleRepository();

const filePaths: string[] = Deno.args;
if (filePaths.length === 0) throw "FilePaths should be at least one.";

for (const filePath of filePaths) {
  const rawArticle = rawArticleRepository.get(filePath);
  const article = new Article(rawArticle);
  const createdArticle = await articleRepository.save(article);
  console.log("Succeeded creating article:", createdArticle);
}
