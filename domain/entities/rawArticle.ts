import {
  array,
  string,
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";
import {
  ARTICLE_PRIVATE_LINE_PATTERN,
  ARTICLE_TAGS_LINE_PATTERN,
  ARTICLE_TITLE_LINE_PATTERN,
  FILE_PATH_PATTERN,
} from "./../constant.ts";

const isValidFilePath = (filePath: string) => {
  if (FILE_PATH_PATTERN.test(filePath)) {
    return true;
  } else {
    console.error("Invalid file path. filePath:", filePath);
    return false;
  }
};

const isValidJSONStr = (s: string) => {
  try {
    JSON.parse(s);
    return true;
  } catch (_e) {
    return false;
  }
};

const toTagsStrFrom = (tagsLine: string) => {
  const matched = tagsLine.match(ARTICLE_TAGS_LINE_PATTERN);

  if (matched === null) return null;

  const { groups } = matched as RegExpMatchArray;

  if (groups === undefined) return null;

  if (groups.articleTags === undefined) return null;

  return groups.articleTags;
};

const isValidTags = (tagsLine: string) => {
  const tagsStr = toTagsStrFrom(tagsLine);

  if (tagsStr === null) return false;
  if (!isValidJSONStr(tagsStr)) return false;

  const tags = JSON.parse(tagsStr);
  const validator = array
    .min(1)
    .of({ name: string, versions: array.min(1).of(string) })
    .destruct();

  const [error, _tags] = validator(tags);

  return !error;
};

/*
 * 記事のフォーマットは以下の通りとする：
 * ・1行目は無視（--------- とか）
 * ・2行目は、記事のタイトルを「title: ~~~~~」の形で記載
 * ・3行目は、記事のタグを「tags: [{name: ~~~, versions: [~~~~]}]」の形で記載
 * ・4行目は、記事の公開範囲を「private: true/false」の形で記載
 * ・5行目は無視（--------- とか）
 * ・6行目以降が記事の本文(最低1行は必要)
 */
const NEW_LINE_CHAR = "\n";
const ARTICLE_HEADER_LINES = 5;
const MINIMUM_ARTICLE_BODY_LINES = 1;
const MINIMUM_ARTICLE_LINES = ARTICLE_HEADER_LINES + MINIMUM_ARTICLE_BODY_LINES;

const isValidFileContent = (filePath: string, fileContent: string) => {
  const maybeArticleHeaders = fileContent.split(
    NEW_LINE_CHAR,
    MINIMUM_ARTICLE_LINES,
  );

  if (maybeArticleHeaders.length < MINIMUM_ARTICLE_LINES) {
    console.error("Article headers are insufficient. filePath:", filePath);
    return false;
  }

  const [, titleLine, tagsLine, privateLine] = maybeArticleHeaders;

  if (!ARTICLE_TITLE_LINE_PATTERN.test(titleLine)) {
    console.error("Invalid an article title line. filePath:", filePath);
    return false;
  }

  if (!isValidTags(tagsLine)) {
    console.error("Invalid an article tags line. filePath:", filePath);
    return false;
  }

  if (!ARTICLE_PRIVATE_LINE_PATTERN.test(privateLine)) {
    console.error("Invalid an article private line. filePath:", filePath);
    return false;
  }

  return true;
};

export class RawArticle {
  constructor(private filePath: string, private fileContent: string) {}

  isValid(): boolean {
    return (
      isValidFilePath(this.filePath) &&
      isValidFileContent(this.filePath, this.fileContent)
    );
  }

  getCode(): string {
    const matchedGroups = this.filePath.match(FILE_PATH_PATTERN)?.groups;
    if (matchedGroups === undefined) throw "Invalid article code.";
    return matchedGroups.articleCode;
  }

  getTitle(): string {
    const [, titleLine] = this.fileContent.split(NEW_LINE_CHAR, 2);
    const matchedGroups = titleLine.match(ARTICLE_TITLE_LINE_PATTERN)?.groups;
    if (matchedGroups === undefined) throw "Invalid article title.";
    return matchedGroups.articleTitle;
  }

  getTags(): [{ name: string; versions: string[] }] {
    const [, , tagsLine] = this.fileContent.split(NEW_LINE_CHAR, 3);
    const matchedGroups = tagsLine.match(ARTICLE_TAGS_LINE_PATTERN)?.groups;
    if (matchedGroups === undefined) throw "Invalid article tags.";
    return JSON.parse(matchedGroups.articleTags);
  }

  getPrivate(): boolean {
    const [, , , privateLine] = this.fileContent.split(NEW_LINE_CHAR, 4);
    const matchedGroups = privateLine.match(
      ARTICLE_PRIVATE_LINE_PATTERN,
    )?.groups;

    if (matchedGroups === undefined) throw "Invalid article private.";

    if (matchedGroups.articlePrivate === "true") return true;
    else return false;
  }

  getBody(): string {
    const articleBody = this.fileContent.replace(/^.*\n.*\n.*\n.*\n.*\n/, "");
    return articleBody;
  }
}
