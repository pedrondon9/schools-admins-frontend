import React, { useEffect, useState, useContext, useRef } from 'react';

import 'animate.css';
import '../login/loginn.css';

import { Box, Grid } from '@mui/material';

import { useForm } from 'react-hook-form';

import { stylesForm, textStyleP } from '../../components/form_components/styleForm';
import UpdatePost from './updatePost';
import UpdatePasswordConfirmOTP from './updatePasswordConfirmOTP';
import UpdatePasswordCreateNew from './updatePasswordCreateNew';

function Registre() {
  const [dataOtp, setDataOtp] = useState({
    timeExpire: 0,
    token: '',
    confirmEmail: '0',
  });

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    try {
      if (JSON.parse(window.localStorage.getItem('enableTAdmins'))) {
      } else {
        window.localStorage.setItem(
          'enableTAdmins',
          JSON.stringify({
            login: false,
            loginId: '',
            logo: '',
            loginName: '',
            loginToken: '',
          })
        );
      }
    } catch (error) {}
  }, []);

  return (
    <>
      <Grid
        bgcolor="backgroundColorPage"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={stylesForm}>
          <UpdatePost setDataOTP={(data) => setDataOtp(data)} dataOTP={dataOtp} chooseForm={'a'} />

          <UpdatePasswordConfirmOTP
            setDataOTP={(data) => setDataOtp(data)}
            dataOTP={dataOtp}
            chooseForm={'a'}
          />

          <UpdatePasswordCreateNew
            setDataOTP={(data) => setDataOtp(data)}
            dataOTP={dataOtp}
            chooseForm={'a'}
          />
        </Box>
      </Grid>
    </>
  );
}

export default Registre;
