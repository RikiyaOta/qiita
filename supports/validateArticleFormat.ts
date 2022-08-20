type Validate = (article: string) => boolean;

/*
 *
---
title: "記事のタイトル"
tags: [{"name": "Ruby", "versions": ["0.0.1"]}]
private: true
---
{{{ Body }}}

 */

const NEW_LINE_CHAR = "\n";
const ARTICLE_HEAD_LINES = 5;
const MINIMUM_ARTICLE_BODY_LINES = 1;

const VALID_TITLE_FORMAT = /^title:\s*"(.+)"$/;
const VALID_TAG_FORMAT = /^tags:\s*(\[.+\])$/;
const VALID_PRIVATE_FORMAT = /^private:\s*(true|false)$/;

const isSufficientArticleLines = (article: string) => {
  const head = article.split(
    NEW_LINE_CHAR,
    ARTICLE_HEAD_LINES + MINIMUM_ARTICLE_BODY_LINES
  );
  return head.length <= ARTICLE_HEAD_LINES + MINIMUM_ARTICLE_BODY_LINES;
};

const hasValidTitle = (article: string) => {
  const [_, maybeTitle] = article.split(NEW_LINE_CHAR, 2);
  return VALID_TITLE_FORMAT.test(maybeTitle);
};

const getTitle = (article: string) => {
  const [_, titleLine] = article.split(NEW_LINE_CHAR, 2);
  const [_, title] = VALID_TITLE_FORMAT.exec(titleLine);
  return title;
};

const isValidJsonStr = (s: string) => {
  try {
    JSON.parse(s);
  } catch (e) {
    return false;
  }
  return true;
};

const hasValidTags = (article: string) => {
  const [_, _, maybeTagsLine] = article.split(NEW_LINE_CHAR, 3);

  if (!VALID_TAG_FORMAT.test(maybeTagsLine)) return false;

  const [_, maybeTags] = VALID_TAG_FORMAT.exec(maybeTagsLine);

  if (!isValidJsonStr(maybeTags)) return false;

  return true;
};

const getTags = (article: string) => {
  const [_, _, tagsLine] = article.split(NEW_LINE_CHAR, 3);
  const [_, tagsStr] = VALID_TAG_FORMAT.exec(tagsLine);
  return JSON.parse(tagsStr);
};

const hasValidPrivate = (article: string) => {
  const [_, _, _, maybePrivate] = article.split(NEW_LINE_CHAR, 4);
  return VALID_PRIVATE_FORMAT.test(maybePrivate);
};

const getPrivate = (article: string) => {
  const [_, _, _, privateLine] = article.split(NEW_LINE_CHAR, 4);
  const [_, privateStr] = VALID_PRIVATE_FORMAT.exec(privateLine);
  if (privateStr == "true") {
    return true;
  } else if (privateStr == "false") {
    return false;
  }
};

export const validate: Validate = (article) => {
  if (
    isSufficientArticleLines(article) &&
    hasValidTitle(article) &&
    hasValidTags(article) &&
    hasValidPrivate(article)
  ) {
    const title = getTitle(article);
    const tags = getTags(article);
    const private = getPrivate(article);
    return { title, tags, private };
  }
};
