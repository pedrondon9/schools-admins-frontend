import React, { useEffect, useState, useContext, useRef } from 'react';
import AppContext from '../../contexts/ServiceContext';
import { URL_SERVER } from '../../contexts/constantesVar';
import 'animate.css';
import '../login/loginn.css';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import RegistreForm from '../../components/form_components/form/RegistreForm';
import ExternalLink from '../../components/form_components/ExternalLink';

import { fields } from '../../components/form_components/arrayFields';

function RegistrePost({ setSelect, setTken, chooseForm }) {
  const {} = useContext(AppContext);

  const [loading, setLoad] = useState(false); //estado para activar el spinner del boton submit
  const [errorInit, setErrorInit] = useState(false);
  const [errorInitMessage, setErrorInitMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);


  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Funcion que se llama despues dpulsar el boton submit
  const onSubmit = async (data) => {
    data.roles = ['admin'];

    try {
      setLoad(true);

      if (data.password !== data.password2) {
        setErrorInit(true);
        setErrorInitMessage('Las contrasenas no coinsiden');
        return;
      }

      const registerPost = await axios({
        url: `${URL_SERVER}/auth/registro_post`,
        method: 'post',
        data,
      });


      if (registerPost.data.success) {
        setErrorInitMessage(registerPost.data.message);
        setTken(registerPost.data.token);

        setErrorInit(true);
        setSelect('1');
      } else {
      }
    } catch (error) {

      if ([403, 400, 405, 401, 503].includes(error.response?.status)) {
        setErrorInitMessage(error.response?.data?.message);
        setErrorInit(true);
        return;
      }

      if (error.request) {
        // No hubo respuesta del servidor
        setErrorInitMessage('No se pudo conectar con el servidor.');
        setErrorInit(true);
        return;
      } else {
        // Otro error
        setErrorInitMessage('Error desconocido.');
        setErrorInit(true);
        return;
      }
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <RegistreForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        fields={fields}
        showPassword={showPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
        errorInit={errorInit}
        errorInitMessage={errorInitMessage}
        loading={loading}
        buttonLabel="Registrarse"
        imageUrl=""
        imageAlt="Global2a"
        linkUrl=""
        linkText=""
        text="Crea tu cuenta"
      />
      <ExternalLink url={'/signIn'} text={'Si ya tienes una cuenta '} path={'Inicia sesion aqui'} />
    </>
  );
}

export default RegistrePost;
