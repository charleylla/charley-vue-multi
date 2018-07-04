import { testUrl } from "@shared/api";

export const getFetchTest = async () => {
  const res = await new Promise(res => {
    setTimeout(() => {
      res(testUrl);
    },2000);
  });
  return res;
};
