import axiosConfigs from '../../components/axiosConfig';

export const GetDataHome = async () => {
  const res = await axiosConfigs.get('/get_info_home');
  const data = res.data.data;
  console.log(res, 'ssssssssswwwwww');
  return data;
};

export const GetDataHomeMaster = async (id, AxiosConfigsToken) => {
  const res = await AxiosConfigsToken.get(`/obtener_cajas_id/${id}`);
  const data = res.data.data;
  return data;
};
