import React, { useEffect, useState, useContext, useRef } from 'react';

import 'animate.css';
import '../login/loginn.css';

import { Box, Grid } from '@mui/material';

import { useForm } from 'react-hook-form';

import { stylesForm } from '../../components/form_components/styleForm';
import RegistrePost from './registerPost';
import RegistreConfirmOTP from './registerConfirmOtp';

function Registre() {
  const [token, setToken] = useState(null);
  const [selectForm, setSelectForm] = useState('0');


  //el useForm de react form hook
  const {
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

      const now = Date.now();
    } catch (error) { }
  }, []);

  return (
    <>
      <Grid
        bgcolor="#f5f5f5"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={stylesForm}>

          {selectForm === '0' ?
            <RegistrePost
              setSelect={(data) => setSelectForm(data)}
              chooseForm={'a'}
              setTken={(data)=> setToken(data)}
            />
            :
            <></>
          }

          {selectForm === '1' ?
            <RegistreConfirmOTP
              setSelect={(data) => setSelectForm(data)}
              setTken={(data)=> setToken(data)}
              token={token}
              chooseForm={'a'}
            />
            :
            <></>
          }
        </Box>
      </Grid>
    </>
  );
}

export default Registre;
