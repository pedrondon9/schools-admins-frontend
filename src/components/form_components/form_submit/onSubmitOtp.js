import axios from 'axios';
import { URL_SERVER } from '../../../contexts/constantesVar';
import { ErrorG } from '../../errorGestion';

export const handleSubmitOptF = async (
  setErrorInitOtp,
  otpCode,
  setDataOTP,
  setLoadOtp,
  setErrorInitMessageOtp,
  cacheKey,
  url
) => {
  const Otp = JSON.parse(window.localStorage.getItem(cacheKey));

  console.log('Otp', Otp);

  setErrorInitOtp(false);
  setLoadOtp(true);

  try {
    const confirmOpt = await axios({
      url: `${URL_SERVER}/auth/${url}`,
      method: 'post',
      data: { otp: otpCode, token: Otp.token },
      headers: {
        'x-access-token': Otp.token,
      },
    });

    if (confirmOpt.data.verify) {
      window.location.href = '/signIn';
      window.localStorage.setItem(
        cacheKey,
        JSON.stringify({
          timeExpire: 0,
          token: '',
          confirmEmail: '0',
        })
      );

      setDataOTP({
        timeExpire: 0,
        token: '',
        confirmEmail: '0',
      });
      setLoadOtp(false);
      setErrorInitMessageOtp('');
    } else {
      setLoadOtp(false);
      setErrorInitMessageOtp(confirmOpt.data.mens);
      setErrorInitOtp(true);
    }
  } catch (error) {
    ErrorG(error, setErrorInitMessageOtp, cacheKey, setDataOTP, setErrorInitOtp);

    setErrorInitOtp(true);
    setLoadOtp(false);
  }
};

//Funcion que se llama despues dpulsar el boton submit
export const onSubmitResendOTPF = async (
  setErrorInitOtp,
  setDataOTP,
  setLoad,
  setErrorInitMessageOtp,
  cacheKey
) => {
  try {
    const Otp = JSON.parse(window.localStorage.getItem(cacheKey));

    setLoad(true);

    const registerPost = await axios({
      url: `${URL_SERVER}/auth/resend_otp`,
      method: 'post',
      data: { token: Otp.token },
      headers: {
        'x-access-token': Otp.token,
      },
    });

    if (registerPost.data.verify) {
      let dataOtp = {
        timeExpire: Date.now() + 10 * 60 * 1000, // 2 minuto en milisegundos
        token: registerPost.data.token,
        confirmEmail: '1',
      };

      window.localStorage.setItem(cacheKey, JSON.stringify(dataOtp));

      setLoad(false);
      setErrorInitMessageOtp(registerPost.data.message);
      setErrorInitOtp(true);
      setDataOTP(dataOtp);
    } else {
      setLoad(false);
      setErrorInitMessageOtp(registerPost.data.message);
      setErrorInitOtp(true);
    }
  } catch (error) {
    ErrorG(error, setErrorInitMessageOtp, cacheKey, setDataOTP, setErrorInitOtp);

    setErrorInitOtp(true);
    setLoad(false);
  }
};
