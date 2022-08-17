import QiitaItemRepository from "./repositories/qiitaItemRepository";

const fileNames: string[] = Deno.args;

if (fileNames.length === 0) throw "Failed validation.";

type ArticleCode = string;
type QiitaItemID = string;
type QiitaTag = { name: string; versions: string[] };
type QiitaItem = {
  articleCode: ArticleCode;
  id: string;
  title: string;
  body: string;
  private: boolean;
  tags: QiitaTag;
};
type CreateQiitaItemResponse = {
  id: QiitaItemID;
};
export type BuildCreateQiitaItemParams = (
  fileNames: string[]
) => Omit<QiitaItem, "id">[];
export type CreateQiitaItem = (
  item: QiitaItem
) => Promise<CreateQiitaItemResponse>;
type MappingRecord = {
  articleCode: ArticleCode;
  qiitaItemId: QiitaItemID;
};

type AddRecordsToMappingCSV = (records: MappingRecord[]) => Promise<void>;
