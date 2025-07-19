import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import axiosConfigs from '../../components/axiosConfig';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Alert, Avatar, IconButton, InputAdornment, Typography } from '@mui/material';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  AccountCircle,
  Grid3x3Rounded,
  Password,
  PhoneAndroid,
  PhoneCallback,
  Send,
  SendRounded,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { deepPurple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import KeyIcon from '@mui/icons-material/Key';
import AppContext from '../../contexts/ServiceContext';
import toast from 'react-hot-toast';

const ResetForm = () => {
  const navigate = useNavigate();

  const { Logins, dispatch, errorResponseLogin, userError, Registers, userName, userId } =
    useContext(AppContext);

  const [load, setLoad] = useState(false); //estado para activar el spinner del boton submit
  const [errorInit, setErrorInit] = useState(false);
  const [errorInitMessage, setErrorInitMessage] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Funcion que se llama despues dpulsar el boton submit
  const onSubmit = async (data) => {
    setErrorInit(false);
    //console.log(data)
    data.id = userId;

    if (data.password == data.password1) {
      try {
        setLoad(true);

        const reset = await axiosConfigs({
          url: `/reset_pkkwkk`,
          method: 'post',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (reset.data.verify) {
          //console.log(logearse)

          setLoad(false);
          toast.success(`${reset.data.mens}`);
        } else {
          toast.error(`${reset.data.mens}`);
          setErrorInit(true);
          setLoad(false);
        }
      } catch (error) {
        //console.log(error)
        setLoad(false);
        //setErrorInitMessage()
        toast.error('Verifica tu conexion');

        setErrorInit(true);
      }
    } else {
      //setErrorInitMessage('')
      toast.error('Las contrasenas no coinsiden');
    }
  };

  return (
    <Grid bgcolor="backgroundColorPage" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          height: 'auto',
          width: {
            xs: '95%',
            sm: 300,
            md: 300,
            lg: 300,
            xl: 300,
          },
          bgcolor: '#fff',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div style={{ width: '95%', marginTop: 20 }}>
            <TextField
              label="Contraseña"
              id="outlined-size-small-2aa"
              defaultValue=""
              size="small"
              type={showPassword ? 'text' : 'password'}
              sx={{ width: '100%' }}
              {...register('password', {
                required: 'Campo requerido',
                minLength: 1,
              })}
              error={!!errors?.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div style={{ width: '95%', marginTop: 20 }}>
            <TextField
              label="Repite la contraseña"
              id="outlined-size-small-2ss"
              defaultValue=""
              size="small"
              type={showPassword1 ? 'text' : 'password'}
              sx={{ width: '100%' }}
              {...register('password1', {
                required: 'Campo requerido',
                minLength: 1,
              })}
              error={!!errors?.password1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword1}
                      edge="end"
                    >
                      {showPassword1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div style={{ width: '95%', marginTop: 20 }}>
            <LoadingButton
              //onClick={handleClick}
              loading={load}
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: '100%' }}
              size="small"
            >
              <span>Cambiar</span>
            </LoadingButton>
          </div>
        </form>
      </Box>
    </Grid>
  );
};

export default ResetForm;
