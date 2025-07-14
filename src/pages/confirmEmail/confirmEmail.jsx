import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AppContext from '../../contexts/ServiceContext'
import { PulseLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom'
import { ACCIONES, CODE_USER, DATA_USER, ID_USER, LOGIN_SPINNER, NAME_USER, PHONE_USER, PORCENTAGE, RESP_ERROR_LOGIN, SALDO, SALDO_EFECTIVO, TOKEN, TYPE_USER, URL_SERVER, VALIDE_USER } from "../../contexts/constantesVar";
import 'animate.css';
import toast, { Toaster } from 'react-hot-toast';
import "../login/loginn.css"
import axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha";
import axiosConfigs from '../../components/axiosConfig'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Alert, Avatar, IconButton, InputAdornment, Typography } from '@mui/material'
import MenuAppBars from '../../components/appBar/appBarr'
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AccountCircle, Email, Grid3x3Rounded, Password, PhoneAndroid, PhoneCallback, Send, SendRounded, Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton';
import { deepPurple } from '@mui/material/colors'
import { useForm } from 'react-hook-form';
import KeyIcon from '@mui/icons-material/Key';
import LoginForm from "../../components/form_components/LoginForm"
import ExternalLink from '../../components/form_components/ExternalLink'
import { stylesForm, stylesFormOpt, textStyleP } from '../../components/form_components/styleForm'
import ConfirmAndUpdate from '../../components/form_components/confirmAndUpdate'
import OtpInput from '../../components/form_components/OtpInput'





const OtpForm = () => {
    const [otpCode, setOtpCode] = useState("");
    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit


    const handleSubmit = () => {
        console.log("OTP ingresado:", otpCode);
        // enviar a backend, validar, etc.
    };

    return (

        <Grid
            bgcolor="backgroundColorPage"
            sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}
        >
            <Box sx={stylesFormOpt}>

                <div style={{ textAlign: "", padding: 20 }}>
                    <Typography variant="p" align='left' sx={textStyleP}>Ingrese el código que hemos enviado en tu
                        <br />
                        <LoadingButton
                            component={LoadingButton}
                            loading={loading}
                            variant="outlined"
                            size='small'
                            color="primary"
                            onClick={handleSubmit}

                            sx={{
                                //textAlign: "right",
                                fontFamily: "sans-serif",
                                marginTop:1
                                //fontSize: "12px",
                                //color: "#3e2723",
                            }}
                        >
                            Enviar otra vez el codigo
                        </LoadingButton>
                    </Typography>
                    <OtpInput length={6} onChange={setOtpCode} />
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        size='small'
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mt: 3 }}
                        disabled={otpCode.length !== 6}
                    >
                        Verificar
                    </LoadingButton>
                </div>
            </Box>
        </Grid>
    );
};

export default OtpForm;
