type Get = (filePath: string) => Promise<string>;

export const get: Get = (filePath) => {
  return Deno.readTextFile(filePath);
};
