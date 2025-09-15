import React, { useEffect, useState, useContext, useRef } from 'react';
import AppContext from '../../contexts/ServiceContext';
import { useNavigate } from 'react-router-dom';
import { URL_SERVER, DATA_USER } from '../../contexts/constantesVar';
import 'animate.css';
import '../login/loginn.css';
import axios from 'axios';
import { Typography } from '@mui/material';
import { Box, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { textStyleP } from '../../components/form_components/styleForm';
import OtpInput from '../../components/form_components/form/OtpInput';
import FormAlert from '../../components/form_components/FormAlert';
import {
  handleSubmitOptF,
  onSubmitResendOTPF,
} from '../../components/form_components/form_submit/onSubmitOtp';
import CacheDataOtp from '../../components/form_components/form_submit/cacheDataOtp';
import { cacheKeyRegister } from '../../components/form_components/constantVariable';

function RegistreConfirmOTP({ setSelect, token, setTken }) {
  const navigate = useNavigate();
  const [loading, setLoad] = useState(false); //estado para activar el spinner del boton submit
  const [loadingResentOtp, setLoadResentOtp] = useState(false);  
  const [errorInitOtp, setErrorInitOtp] = useState(false);
  const [errorInitMessageOtp, setErrorInitMessageOtp] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loadingOpt, setLoadOtp] = useState(false);

  const cacheKey = cacheKeyRegister;

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSubmitOpt = async () => {

    if (false) {
      console.log(otpCode)
      setLoad(false);

      return
    }

    try {
      setLoadOtp(true);


      if (!otpCode) {
        setErrorInitOtp(true);
        setErrorInitMessageOtp('Ingrese el codigo');
        return;
      }

      const registerPost = await axios({
        url: `${URL_SERVER}/auth/confir_opt_register_post`,
        method: 'post',
        data: { otp: otpCode },
        headers: {
          'x-access-token': token
        }
      });

      if (registerPost.data.success) {
        console.log(registerPost.data);
        setErrorInitMessageOtp(registerPost.data.message);
        setErrorInitOtp(true);
        navigate('/signIn');
      } else {

      }

    } catch (error) {
      console.log(error)

      if ([403, 400, 405, 401, 503].includes(error.response?.status)) {
        setErrorInitMessageOtp(error.response?.data?.message);
        setErrorInitOtp(true)
        return
      }

      if (error.request) {
        // No hubo respuesta del servidor
        setErrorInitMessageOtp('No se pudo conectar con el servidor.');
        setErrorInitOtp(true)
        return

      } else {
        // Otro error
        setErrorInitMessageOtp('Error desconocido.');
        setErrorInitOtp(true)
        return

      }
    } finally {

      setLoadOtp(false);
    }
  };

  //Funcion que se llama despues dpulsar el boton submit
  const onSubmitResendOTP = async (data) => {

    try {
      setLoadResentOtp(true);

      const registerPost = await axios({
        url: `${URL_SERVER}/auth/resend_otp_register`,
        method: 'post',
        headers: {
          'x-access-token': token
        }
      });

      if (registerPost.data.success) {
        console.log(registerPost.data);
        setErrorInitMessageOtp(registerPost.data.message);
        setErrorInitOtp(true);
      } else {

      }

    } catch (error) {
      console.log(error)
      if ([403, 400, 405, 401, 503].includes(error.response?.status)) {
        setErrorInitMessageOtp(error.response?.data?.message);
        setErrorInitOtp(true)
        return
      }

      if (error.request) {
        // No hubo respuesta del servidor
        setErrorInitMessageOtp('No se pudo conectar con el servidor.');
        setErrorInitOtp(true)
        return

      } else {
        // Otro error
        setErrorInitMessageOtp('Error desconocido.');
        setErrorInitOtp(true)
        return

      }
    } finally {

      setLoadResentOtp(false);
    }
  };

  useEffect(() => {
    try {
      CacheDataOtp(cacheKey, setDataOTP);
    } catch (error) { }
  }, []);

  return (
    <>
      <div style={{ textAlign: '', padding: 20 }}>
        <Typography variant="p" align="left" sx={textStyleP}>
          Ingrese el código que hemos enviado en tu correo (tienes 2 minutos para ingresarlo)
          <br />
          <LoadingButton
            component={LoadingButton}
            loading={loadingResentOtp}
            variant="outlined"
            size="small"
            color="primary"
            onClick={onSubmitResendOTP}
            sx={{
              //textAlign: "right",
              fontFamily: 'sans-serif',
              marginTop: 1,
              //fontSize: "12px",
              //color: "#3e2723",
            }}
          >
            Enviar otra vez el codigo
          </LoadingButton>
          <br />
        </Typography>
        <OtpInput length={6} onChange={setOtpCode} />
        {errorInitOtp && (
          <Box sx={{ width: '95%', mt: 2 }}>
            <FormAlert message={errorInitMessageOtp} />
          </Box>
        )}
        <LoadingButton
          loading={loadingOpt}
          variant="contained"
          size="small"
          color="primary"
          onClick={handleSubmitOpt}
          sx={{ mt: 3 }}
          disabled={otpCode.length !== 6}
        >
          Verificar
        </LoadingButton>
      </div>

    </>
  );
}

export default RegistreConfirmOTP;
