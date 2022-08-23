const USE_CASE_TYPES = [
  "CREATE_ARTICLE",
  "COPY_ARTICLE",
  "MODIFY_ARTICLE",
  "RENAME_ARTICLE",
  "DELETE_ARTICLE",
] as const;

export type UseCaseType = typeof USE_CASE_TYPES[number];

export const isValidUseCaseType = (s: string): boolean => {
  return USE_CASE_TYPES.includes(s as UseCaseType);
};

export interface UseCaseProcessor {
  run(): Promise<void>;
}
