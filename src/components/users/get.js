export const Get = async (AxiosConfigsToken,url) => {
  const res = await AxiosConfigsToken.get(url);
  const data = res.data;
  console.log(data,'sssssssss')
  return data;
};
