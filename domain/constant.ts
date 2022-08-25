export const FILE_PATH_PATTERN = /^articles\/(?<articleCode>.+)\.md$/;
export const ARTICLE_TITLE_LINE_PATTERN = /^title:\s*(?<articleTitle>.+)\s*$/;
export const ARTICLE_TAGS_LINE_PATTERN = /^tags:\s*(?<articleTags>.+)\s*$/;
export const ARTICLE_PRIVATE_LINE_PATTERN =
  /^private:\s*(?<articlePrivate>true|false)\s*$/;
