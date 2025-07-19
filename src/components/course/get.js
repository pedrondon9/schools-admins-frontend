export const Get = async (AxiosConfigsToken) => {
  const res = await AxiosConfigsToken.get('/get_course');
  const data = res.data.data.docs;
  //console.log(res,'sssssssss')
  return data;
};
