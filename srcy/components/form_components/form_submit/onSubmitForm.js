import axios from 'axios';
import { URL_SERVER } from '../../../contexts/constantesVar';

async function OnSubmit(
  data,
  path,
  setLoad,
  setErrorInitMessage,
  setErrorInit,
  setDataOTP,
  cacheKey = ''
) {
  setErrorInit(false);
  try {
    setLoad(true);

    const registerPost = await axios({ url: `${URL_SERVER}/${path}`, method: 'post', data });

    if (registerPost.data.verify) {
      console.log(registerPost.data);

      let dataOtp = {
        timeExpire: Date.now() + 10 * 60 * 1000, // 2 minuto en milisegundos
        token: registerPost.data.token,
        confirmEmail: '1',
      };

      window.localStorage.setItem(cacheKey, JSON.stringify(dataOtp));

      setLoad(false);
      setErrorInitMessage(registerPost.data.mens);
      setErrorInit(true);
      setDataOTP(dataOtp);
    } else {
      setLoad(false);
      setErrorInitMessage(registerPost.data.mens);
      setErrorInit(true);
    }
  } catch (error) {
    console.log(error, 'error');

    const messages = error.response.data ? error.response.data.mens : 'Error al verificar el OTP';

    if (error.response.data?.mens === null) {
      setErrorInit(true);
      setErrorInitMessage('');
    } else {
      setErrorInit(true);
      setErrorInitMessage(messages);
    }
    setLoad(false);
  }
}

export default OnSubmit;
