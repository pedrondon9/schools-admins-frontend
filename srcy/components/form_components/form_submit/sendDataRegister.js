import axios from 'axios';

const onSubmit = async (data) => {
  setErrorInit(false);
  console.log('Datos del formulario:', data);

  if (data.password !== data.password2) {
    setErrorInit(true);
    setErrorInitMessage('Las contrasenas no coinsiden');

    return;
  }

  try {
    setLoad(true);

    const registerPost = await axios({
      url: `${URL_SERVER}/auth/registro_post`,
      method: 'post',
      data,
    });

    if (registerPost.data.verify) {
      console.log(registerPost.data);

      let dataOtp = {
        timeExpire: Date.now() + 10 * 60 * 1000, // 2 minuto en milisegundos
        token: registerPost.data.token,
        confirmEmail: registerPost.data.confirmEmail,
      };

      window.localStorage.setItem(cacheKey, JSON.stringify(dataOtp));

      setShowFormOtp(true);
      setLoad(false);
      setErrorInitMessage(registerPost.data.mens);
      setErrorInit(true);
      setDataOtp(dataOtp);
      setErrorInitOtp(false);
      setErrorInitMessageOtp('');
    } else {
      setLoad(false);
      setErrorInitMessage(registerPost.data.mens);
      setErrorInit(true);
      setErrorInitOtp(false);
      setErrorInitMessageOtp('');
    }
  } catch (error) {
    console.log(error, 'error');
    setLoad(false);
    setErrorInitMessage('Verifica tu conexion');
    setErrorInit(true);
    setErrorInitOtp(false);
    setErrorInitMessageOtp('');
  }
};
