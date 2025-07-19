import axios from 'axios';
import { URL_SERVER } from '../../../contexts/constantesVar';

export const handleSubmitOptF = async (
  setErrorInitOtp,
  otpCode,
  setDataOTP,
  setLoadOtp,
  setErrorInitMessageOtp,
  cacheKey
) => {
  const Otp = JSON.parse(window.localStorage.getItem(cacheKey));

  setErrorInitOtp(false);
  setLoadOtp(true);

  try {
    const confirmOpt = await axios({
      url: `${URL_SERVER}/auth/confir_opt_register_post`,
      method: 'post',
      data: { otp: otpCode, token: Otp.token },
    });

    console.log(confirmOpt.data, 'verify otp');

    if (confirmOpt.data.verify) {
      const cachedDataOtp = JSON.parse(window.localStorage.getItem(cacheKey))
        ? JSON.parse(window.localStorage.getItem(cacheKey))
        : null;
      if (cachedDataOtp) {
        cachedDataOtp.confirmEmail = '2';
      }

      window.localStorage.setItem(cacheKey, JSON.stringify(cachedDataOtp));
      setDataOTP(cachedDataOtp);

      setLoadOtp(false);
    } else {
      setLoadOtp(false);
      setErrorInitMessageOtp(confirmOpt.data.mens);
      setErrorInitOtp(true);
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de error

      if (error.response?.data?.mens === 'token_expired') {
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
        setErrorInitMessageOtp('');
      } else {
        setErrorInitMessageOtp(error.response.data.mens || 'Error del servidor.');
      }
    } else if (error.request) {
      // No hubo respuesta del servidor
      setErrorInitMessageOtp('No se pudo conectar con el servidor.');
    } else {
      // Otro error
      setErrorInitMessageOtp('Error desconocido.');
    }

    setErrorInitOtp(true);
    setLoad(false);
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
      data: { otp: Otp },
    });

    if (registerPost.data.verify) {
      console.log(registerPost.data);

      let dataOtp = {
        timeExpire: Date.now() + 10 * 60 * 1000, // 2 minuto en milisegundos
        token: registerPost.data.token,
        confirmEmail: '1',
      };

      window.localStorage.setItem(cacheKey, JSON.stringify(dataOtp));

      setLoad(false);
      setErrorInitMessageOtp(registerPost.data.mens);
      setErrorInitOtp(true);
      setDataOTP(dataOtp);
    } else {
      setLoad(false);
      setErrorInitMessageOtp(registerPost.data.mens);
      setErrorInitOtp(true);
    }
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de error

      if (error.response?.data?.mens === 'token_expired') {
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
        setErrorInitMessageOtp('');
      } else {
        setErrorInitMessageOtp(error.response.data.mens || 'Error del servidor.');
      }
    } else if (error.request) {
      // No hubo respuesta del servidor
      setErrorInitMessageOtp('No se pudo conectar con el servidor.');
    } else {
      // Otro error
      setErrorInitMessageOtp('Error desconocido.');
    }

    setErrorInitOtp(true);
    setLoad(false);
  }
};
