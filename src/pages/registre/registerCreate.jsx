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
  fields,
  fieldUpdatePassword,
} from '../../components/form_components/arrayFields';
import CacheDataOtp from '../../components/form_components/form_submit/cacheDataOtp';
import { cacheKeyRegister } from '../../components/form_components/constantVariable';
import { OnSubmitRegister } from '../../components/form_components/form_submit/onSubmitForm';
import { useNavigate } from 'react-router-dom';

function RegisterCreate({ setDataOTP, dataOTP, chooseForm }) {
  
  const { dispatch } = useContext(AppContext);

  const [loading, setLoad] = useState(false); //estado para activar el spinner del boton submit
  const [errorInit, setErrorInit] = useState(false);
  const [errorInitMessage, setErrorInitMessage] = useState('');
  const [arrayFiles, setArrayFiles] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const cacheKey = cacheKeyRegister ;

  const navigate = useNavigate();


  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Funcion que se llama despues dpulsar el boton submit
  const onSubmit = async (data) => {
    //console.log(data, arrayFiles);
    //console.log(dataOTP)
    OnSubmitRegister(
      data,
      cacheKey,
      setErrorInit,
      setLoad,
      setErrorInitMessage,
      setDataOTP,
      arrayFiles,
      navigate,
      dispatch
    );
  };

  useEffect(() => {
    try {
      CacheDataOtp(cacheKey, setDataOTP);
    } catch (error) {
      console.error('Error en useEffect de OTP:', error);
    }
  }, []);

  return (
    <>
      {dataOTP?.confirmEmail === '2' ? (
        <>
          <RegistreForm
            onSubmit={onSubmit}
            setArrayFiles={setArrayFiles}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            fields={fieldCreate}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            errorInit={errorInit}
            errorInitMessage={errorInitMessage}
            loading={loading}
            buttonLabel="Registrar tu institución"
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

export default RegisterCreate;
