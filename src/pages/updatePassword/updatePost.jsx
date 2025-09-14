import React, { useEffect, useState, useContext, useRef } from 'react';
import AppContext from '../../contexts/ServiceContext';
import { URL_SERVER } from '../../contexts/constantesVar';
import 'animate.css';
import '../login/loginn.css';
import axios from 'axios';
import KeyIcon from '@mui/icons-material/Key';

import { useForm } from 'react-hook-form';
import RegistreForm from '../../components/form_components/form/RegistreForm';
import ExternalLink from '../../components/form_components/ExternalLink';

import { fields } from '../../components/form_components/arrayFields';
import { OnSubmit } from '../../components/form_components/form_submit/onSubmitForm';
import CacheDataOtp from '../../components/form_components/form_submit/cacheDataOtp';
import { cacheKeyUpdatePassword } from '../../components/form_components/constantVariable';
import { ErrorG } from '../../components/errorGestion';
import { Box, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import OtpInput from '../../components/form_components/form/OtpInput';
import FormAlert from '../../components/form_components/FormAlert';
import { textStyleP } from '../../components/form_components/styleForm';
import { set } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function RegistrePost({ setDataOTP, dataOTP, chooseForm }) {
  const { } = useContext(AppContext);

  const navigate = useNavigate();

  const [loading, setLoad] = useState(false);
  const [loadingResentOtp, setLoadResentOtp] = useState(false);
  const [errorInit, setErrorInit] = useState(false);
  const [errorInitMessage, setErrorInitMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [selectForm, setSelectForm] = useState('0');

  const cacheKey = cacheKeyUpdatePassword;


  const [errorInitOtp, setErrorInitOtp] = useState(false);
  const [errorInitMessageOtp, setErrorInitMessageOtp] = useState('');
  const [tokenData, setTokenData] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loadingOpt, setLoadOtp] = useState(false);

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Funcion que se llama despues dpulsar el boton submit
  const onSubmit = async (data) => {
    setErrorInitMessageOtp('');
    setErrorInitOtp(false);
    setErrorInit(false);
    setLoad(true);

    if (false) {
      console.log(data)
      setLoad(false);

      return
    }

    try {

      if (data.password1 !== data.password2) {
        setErrorInit(true);
        setErrorInitMessage('Las contrasenas no coinsiden');
        return;
      }

      const registerPost = await axios({
        url: `${URL_SERVER}/update_pass/send_otp`,
        method: 'post',
        data,
      });

      if (registerPost.data.success) {
        console.log(registerPost.data);
        setTokenData(registerPost.data.token)
        setLoad(false);
        setErrorInitMessage("");
        setErrorInit(true);
        setSelectForm('1');
        //navigate('/');

      } else {

        setLoad(false);
        setErrorInitMessage(registerPost.data.mens);
        setErrorInit(true);
      }

    } catch (error) {

      if ([403, 400, 405, 401, 503].includes(error.response?.status)) {
        setErrorInitMessage(error.response?.data?.message);
        setErrorInit(true)
        return
      }

      if (error.request) {
        // No hubo respuesta del servidor
        setErrorInitMessage('No se pudo conectar con el servidor.');
        setErrorInitOtp(true)
        return

      } else {
        // Otro error
        setErrorInitMessage('Error desconocido.');
        setErrorInitOtp(true)
        return

      }
    } finally {

      setLoad(false);
    }

  };

  const handleSubmitOpt = async () => {
    setErrorInitMessage('')
    setErrorInit(false)
    setErrorInitMessageOtp('')
    setErrorInitOtp(false);
    setLoadOtp(true);

    if (false) {
      console.log(otpCode)
      setLoad(false);

      return
    }

    try {

      if (!otpCode) {
        setErrorInitOtp(true);
        setErrorInitMessageOtp('Ingrese el codigo');
        return;
      }

      const registerPost = await axios({
        url: `${URL_SERVER}/update_pass/confir_opt_update_pass_post`,
        method: 'post',
        data: { otp: otpCode },
        headers: {
          'x-access-token': tokenData
        }
      });

      if (registerPost.data.success) {
        console.log(registerPost.data);
        setErrorInitMessageOtp(registerPost.data.message);
        setErrorInitOtp(true);
        setSelectForm('0');
        navigate('/signIn');
      } else {


      }

    } catch (error) {

      if ([403, 400, 405, 401, 503].includes(error.response?.status)) {
        setErrorInitMessageOtp(error.response?.data?.message);
        setErrorInitOtp(true)
        return
      }

      if (error.request) {
        // No hubo respuesta del servidor
        setErrorInitMessage('No se pudo conectar con el servidor.');
        setErrorInitOtp(true)
        return

      } else {
        // Otro error
        setErrorInitMessage('Error desconocido.');
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
          'x-access-token': tokenData
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
        setErrorInitMessage('No se pudo conectar con el servidor.');
        setErrorInitOtp(true)
        return

      } else {
        // Otro error
        setErrorInitMessage('Error desconocido.');
        setErrorInitOtp(true)
        return

      }
    } finally {

      setLoadResentOtp(false);
    }
  };


  const fieldEmail = [
    {
      name: 'email',
      label: 'Correo',
      type: 'email',
      validation: { required: true },
      startIcon: null,
    },
    {
      name: 'password1',
      label: 'Contraseña',
      type: 'password',
      validation: { required: true },
      startIcon: <KeyIcon />,
    },

    {
      name: 'password2',
      label: 'Repite la Contraseña',
      type: 'password',
      validation: { required: true },
      startIcon: <KeyIcon />,
    },
  ];
  useEffect(() => {
    try {
    } catch (error) { }
  }, []);

  return (
    <>
      {selectForm === '0' ? (
        <>
          <RegistreForm
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            fields={fieldEmail}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            errorInit={errorInit}
            errorInitMessage={errorInitMessage}
            loading={loading}
            buttonLabel="Enviar"
            imageUrl=""
            imageAlt="Global2a"
            linkUrl=""
            linkText=""
            text='Recuperar contraseña'

          />
          <ExternalLink
            url={'/signIn'}
            text={'Si ya tienes una cuenta inicia'}
            path={'Inicia sesion aqui'}
          />
        </>
      ) : (
        <></>
      )}

      {selectForm === '1' ? (
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

          <Button variant='outlined' onClick={() => { setSelectForm('0') }}>Atras</Button>
          <ExternalLink
            url={'/signIn'}
            text={'Si ya tienes una cuenta inicia'}
            path={'Inicia sesion aqui'}
          />

        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default RegistrePost;
