export const Get = async (AxiosConfigsToken) => {
  const res = await AxiosConfigsToken.get('/get_profes');
  const data = res.data.data;
  //console.log(data,'sssssssss')
  return data;
};
