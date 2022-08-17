import ky from "ky";
import { CreateQiitaItem } from "./../createArticles";

const BASE_URL = "https://qiita.com";
const QIITA_ACCESS_TOKEN = Deno.env.get("QIITA_ACCESS_TOKEN");

export const create: CreateQiitaItem = (item) => {
  const url = `${BASE_URL}/api/v2/items`;
  const body = {
    title: item.title,
    body: item.body,
    private: item.private,
    tags: item.tags,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${QIITA_ACCESS_TOKEN}`,
  };
  return ky.post(url, { headers, json: body }).json();
};
