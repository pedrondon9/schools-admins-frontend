import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/ServiceContext'
import { PulseLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom'
import {
    ACCIONES, CODE_USER, ID_USER, LOGIN_SPINNER, NAME_USER, PHONE_USER, PORCENTAGE, RESP_ERROR_LOGIN, SALDO, SALDO_EFECTIVO, TOKEN, TYPE_USER,
    URL_SERVER, VALIDE_USER, DATA_USER
} from "../../contexts/constantesVar";
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
import RegistreForm from "../../components/form_components/RegistreForm"
import ExternalLink from '../../components/form_components/ExternalLink'
import { stylesForm, textStyleP } from '../../components/form_components/styleForm'
import OtpInput from '../../components/form_components/OtpInput'
import FormAlert from '../../components/form_components/FormAlert'
import { ca } from 'date-fns/locale'
import { set } from 'date-fns'




function Registre() {

    const navigate = useNavigate();

    const { Logins, dispatch, errorResponseLogin, userError, Registers, userName, userId, dataUser } = useContext(AppContext)

    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')
    const [errorInitOtp, setErrorInitOtp] = useState(false)
    const [errorInitMessageOtp, setErrorInitMessageOtp] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showFormOtp, setShowFormOtp] = useState(false)

    const [otpCode, setOtpCode] = useState("");
    const [dataOtp, setDataOtp] = useState({
        timeExpire: 0,
        token: '',
        confirmEmail: false,
    });
    const [loadingOpt, setLoadOtp] = useState(false)

    const expirationOpt = 60 * 1000;
    const cacheKey = 'otpCodeCache';



    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    const handleSubmitOpt = async () => {

        console.log("OTP ingresado:", otpCode);
        // enviar a backend, validar, etc.
        setErrorInitOtp(false)
        setLoadOtp(true)

        try {

            const confirmOpt = await axios({ url: `${URL_SERVER}/confirm_opt`, method: "post", data: { otp: otpCode } })

            if (confirmOpt.data.verify) {
                let dataUsers = {
                    valor: confirmOpt.data.validarLogin,
                    valorI: confirmOpt.data.userData._id,
                    nameI: confirmOpt.data.userData.nombre,
                    emailI: confirmOpt.data.userData.contact,
                    tokI: confirmOpt.data.token,
                    confirmEmail: confirmOpt.data.confirmEmail,
                }
                window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))

                //console.log(logearse)

                setLoadOtp(false)

                dispatch({
                    type: DATA_USER,
                    payload: dataUsers
                })



            } else {

                setLoadOtp(false)

                window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))
                setErrorInitMessage(confirmOpt.data.mens)
                setErrorInitOtp(true)

            }
        } catch (error) {
            setLoadOtp(false)
            setErrorInitMessageOtp('Verifica tu conexion')
            setErrorInitOtp(true)
        }
    };
    //Funcion que se llama despues dpulsar el boton submit
    const onSubmit = async (data) => {

        setErrorInit(false)
        console.log("Datos del formulario:", data)

        if (data.password1 !== data.password2) {
            setErrorInit(true)
            setErrorInitMessage('Las contrasenas no coinsiden')

            return
        }


        try {

            setLoad(true)

            const registerPost = await axios({ url: `${URL_SERVER}/login_post`, method: "post", data })
            console.log(registerPost.data)

            if (registerPost.data.verify) {
                let dataOpt = {

                    timeExpire: Date.now() + 2 * 60 * 1000, // 2 minuto en milisegundos
                    token: registerPost.data.token,
                    confirmEmail: registerPost.data.confirmEmail,
                }

                window.localStorage.setItem(cacheKey, JSON.stringify(dataOpt))

                setShowFormOtp(true)
                setLoad(false)
                setErrorInitMessage(registerPost.data.mens)
                setErrorInit(true)

            } else {

                setLoad(false)
                setErrorInitMessage(registerPost.data.mens)
                setErrorInit(true)

            }

        } catch (error) {
            //console.log(error)
            setLoad(false)
            setErrorInitMessage('Verifica tu conexion')
            setErrorInit(true)
        }

    }
    const fields = [
        {
            name: "email",
            label: "Correo",
            type: "email",
            validation: { required: "Campo requerido" },
            startIcon: <Email />,
        },

        /*
        {
            name: "rol",
            label: "Rol",
            type: "select",
            validation: { required: "Selecciona un rol" },
            options: [
                { label: "Estudiante", value: "student" },
                { label: "Profesor", value: "teacher" },
               { label: "Administrador", value: "admin" },
            ],
        }, 

        */

        {
            name: "password1",
            label: "Contraseña",
            type: "password",
            validation: { required: "Campo requerido" },
            startIcon: <KeyIcon />,
        },

        {
            name: "password2",
            label: "Repite la Contraseña",
            type: "password",
            validation: { required: "Campo requerido" },
            startIcon: <KeyIcon />,
        },
    ];
    useEffect(() => {
        try {


            const cachedDataOtp = JSON.parse(window.localStorage.getItem(cacheKey)) ? JSON.parse(window.localStorage.getItem(cacheKey)) : null;

            if (JSON.parse(window.localStorage.getItem("enableTAdmins"))) {
            } else {
                window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
            }

            const now = Date.now();
            if (cachedDataOtp) {
                if (now < parseInt(cachedDataOtp.timeExpire)) {
                    setDataOtp(cachedDataOtp);
                    return;
                } else {
                    window.localStorage.removeItem(cacheKey);
                    setDataOtp({
                        timeExpire: 0,
                        token: '',
                        confirmEmail: true,
                    });
                    setShowFormOtp(false);
                    setOtpCode("");
                    setErrorInitOtp(false);
                    setErrorInitMessageOtp('');
                    console.log("El OTP ha expirado o no existe.");
                    setLoadOtp(false);
                }
            } else {
                window.localStorage.setItem(cacheKey, JSON.stringify({
                    timeExpire: 0,
                    token: '',
                    confirmEmail: true
                }));
                setDataOtp({
                    timeExpire: 0,
                    token: '',
                    confirmEmail: true
                });
            }

        } catch (error) {

        }


    }, [])

    return (
        <>
            <Grid
                bgcolor="backgroundColorPage"
                sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}
            >
                <Box sx={stylesForm}>
                    {!dataOtp.confirmEmail ?
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
                                buttonLabel="Iniciar"
                                imageUrl=""
                                imageAlt="Global2a"
                                linkUrl=""
                                linkText=""
                            />
                            <ExternalLink url={"/signIn"} text={"Si ya tienes una cuenta inicia"} />
                        </>
                        :
                        <></>
                    }


                    {dataOtp.confirmEmail ?
                        <div style={{ textAlign: "", padding: 20 }}>
                            <Typography variant="p" align='left' sx={textStyleP}>Ingrese el código que hemos enviado en tu correo (tienes 2 minutos para ingresarlo)
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
                                        marginTop: 1
                                        //fontSize: "12px",
                                        //color: "#3e2723",
                                    }}
                                >
                                    Enviar otra vez el codigo
                                </LoadingButton>
                                <br />

                            </Typography>
                            <OtpInput length={6} onChange={setOtpCode} />
                            {errorInit && (
                                <Box sx={{ width: "95%", mt: 2 }}>
                                    <FormAlert message={errorInitMessage} />
                                </Box>
                            )}
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

                        :
                        <></>

                    }
                </Box>
            </Grid>

        </>
    );
};

export default Registre;