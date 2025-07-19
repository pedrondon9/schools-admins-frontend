import axios from 'axios';
import { DATA_USER, URL_SERVER } from '../../../contexts/constantesVar';

export const OnSubmit = async (
  data,
  path,
  setLoad,
  setErrorInitMessage,
  setErrorInit,
  setDataOTP,
  cacheKey = ''
) => {
  setErrorInit(false);
  try {
    setLoad(true);

    const registerPost = await axios({
      url: `${URL_SERVER}/${path}`,
      method: 'post',
      data,
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
      setErrorInitMessage(registerPost.data.mens);
      setErrorInit(true);
      setDataOTP(dataOtp);
    } else {
      setLoad(false);
      setErrorInitMessage(registerPost.data.mens);
      setErrorInit(true);
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
        setErrorInitMessage('');
      } else {
        setErrorInitMessage(error.response.data.mens || 'Error del servidor.');
      }
    } else if (error.request) {
      // No hubo respuesta del servidor
      setErrorInitMessage('No se pudo conectar con el servidor.');
    } else {
      // Otro error
      setErrorInitMessage('Error desconocido.');
    }

    setErrorInit(true);
    setLoad(false);
  }
};

export const OnSubmitRegister = async (
  data,
  cacheKey,
  setErrorInit,
  setLoad,
  setErrorInitMessage,
  setDataOTP,
  arrayFiles,
  navigate,
  dispatch
) => {
  console.log(data, arrayFiles);

  const cachedDataOtp = JSON.parse(window.localStorage.getItem(cacheKey))
    ? JSON.parse(window.localStorage.getItem(cacheKey))
    : null;

  if (cachedDataOtp) {
    setErrorInit(false);

    console.log('Datos del formulario:', data);

    try {
      const fs = new FormData();
      fs.append('arrayFiles', arrayFiles);
      fs.append('schoolData', JSON.stringify(data));
      fs.append('token', cachedDataOtp.token);

      setLoad(true);

      const registerPost = await axios({
        url: `${URL_SERVER}/auth/create_first_admin_post`,
        method: 'post',
        data: fs,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(registerPost.data);
      if (registerPost.data.verify) {
        let dataUsers = {
          login: registerPost.data.userData.active,
          loginId: registerPost.data.userData._id,
          logo: registerPost.data.userData.logo,
          loginName: registerPost.data.userData.fullname,
          loginToken: registerPost.data.token,
          schoolTenant: registerPost.data.token,
          schoolName: registerPost.data.token,
          schoolLogo: registerPost.data.token,
        };

        window.localStorage.setItem('enableTAdmins', JSON.stringify(dataUsers));
        window.localStorage.removeItem(cacheKey);

        //console.log(logearse)

        setLoad(false);

        dispatch({
          type: DATA_USER,
          payload: dataUsers,
        });

        navigate('/');

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
          setErrorInitMessage('');
        } else {
          setErrorInitMessage(error.response.data.mens || 'Error del servidor.');
        }
      } else if (error.request) {
        // No hubo respuesta del servidor
        setErrorInitMessage('No se pudo conectar con el servidor.');
      } else {
        // Otro error
        setErrorInitMessage('Error desconocido.');
      }

      setErrorInit(true);
      setLoad(false);
    }
  }
};
