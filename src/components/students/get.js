export const Get = async (AxiosConfigsToken) => {
  const res = await AxiosConfigsToken.get('/get_student');
  const data = res.data.data;
  //console.log(data,'sssssssss')
  return data;
};
