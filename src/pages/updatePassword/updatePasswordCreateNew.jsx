import React, { useEffect, useState, useContext, useRef } from 'react';
import AppContext from '../../contexts/ServiceContext';
import { DATA_USER, URL_SERVER } from '../../contexts/constantesVar';
import 'animate.css';
import '../login/loginn.css';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import RegistreForm from '../../components/form_components/form/RegistreForm';
import ExternalLink from '../../components/form_components/ExternalLink';

import {
  fieldCreate,
  fieldEmail,
  fields,
  fieldUpdatePassword,
} from '../../components/form_components/arrayFields';
import CacheDataOtp from '../../components/form_components/form_submit/cacheDataOtp';
import { OnSubmit } from '../../components/form_components/form_submit/onSubmitForm';
import { cacheKeyUpdatePassword } from '../../components/form_components/constantVariable';

function UpdatePasswordCreateNew({ setDataOTP, dataOTP, chooseForm }) {
  const cacheKey = cacheKeyUpdatePassword;

  const {} = useContext(AppContext);

  const [loading, setLoad] = useState(false); //estado para activar el spinner del boton submit
  const [errorInit, setErrorInit] = useState(false);
  const [errorInitMessage, setErrorInitMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Funcion que se llama despues dpulsar el boton submit

  const onSubmit = async (data) => {
    if (chooseForm === 'a') {
      if (data.password !== data.password2) {
        setErrorInit(true);
        setErrorInitMessage('Las contrasenas no coinsiden');
        return;
      }

      await OnSubmit(
        data,
        'auth/registro_post',
        setLoad,
        setErrorInitMessage,
        setErrorInit,
        setDataOTP,
        cacheKey
      );
    }
  };

  useEffect(() => {
    try {
      CacheDataOtp(cacheKey, setDataOTP);
    } catch (error) {}
  }, []);

  return (
    <>
      {dataOTP?.confirmEmail === '2' ? (
        <>
          <RegistreForm
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            fields={fieldUpdatePassword}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            errorInit={errorInit}
            errorInitMessage={errorInitMessage}
            loading={loading}
            buttonLabel="Actualizar"
            imageUrl=""
            imageAlt="Global2a"
            linkUrl=""
            linkText=""
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default UpdatePasswordCreateNew;
