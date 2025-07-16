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
import { stylesForm, stylesFormOpt, textStyleP } from '../../components/form_components/styleForm'
import RecetPassword from '../../components/form_components/recetPassword'
import OtpInput from '../../components/form_components/OtpInput'
import PassworUpdate2 from '../../components/form_components/passworUpdate2'



function UpdatePassword() {

    const navigate = useNavigate();

    const { Logins, dispatch, errorResponseLogin, userError, Registers, userName, userId } = useContext(AppContext)

    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);


    const [otpCode, setOtpCode] = useState("");
    const [loadingOpt, setLoadOtp] = useState(false)//estado para activar el spinner del boton submit
    const [errorInitOtp, setErrorInitOtp] = useState(false)
    const [showFormOtp, setShowFormOtp] = useState(false)
    const [errorInitMessageOtp, setErrorInitMessageOtp] = useState('')


    const [errorInitMessageUpdatePass, setErrorInitMessageUpdatePass] = useState(false)
    const [errorInitUpdatePass, setErrorInitUpdatePass] = useState('')
    const [loadingUpdatePass, setLoadUpdatePass] = useState(false)//estado para activar el spinner del boton submit
    const [showFormUpdatePass, setShowFormUpdatePass] = useState(false)
    const [tokenUpdataPass, setTokenUpdataPass] = useState('')




    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    //Funcion que se llama despues dpulsar el boton submit
    const onSubmitSendEmali = async (data) => {
        setErrorInit(false)
        if (data.password1 !== data.password2) {
            setErrorInit(true)
            setErrorInitMessage('Las contrasenas no coinsiden')

            return
        }


        try {

            setLoad(true)

            const logearse = await axios({ url: `${URL_SERVER}/login_post`, method: "post", data })
            console.log(logearse.data)

            if (logearse.data.verify) {
                setShowFormOtp(true)
                setTokenUpdataPass(logearse.data.token)

            } else {
                let dataUsers = {
                    valor: false,
                    valorI: "",
                    nameI: "",
                    emailI: "",
                    tokI: "",
                }
                setLoad(false)

                window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))
                setErrorInitMessage(logearse.data.mens)
                setErrorInit(true)

            }

        } catch (error) {
            //console.log(error)
            setLoad(false)
            setErrorInitMessage('Verifica tu conexion')
            setErrorInit(true)
        }

    }


    const handleSubmitOpt = async () => {
        
        console.log("OTP ingresado:", otpCode);
        // enviar a backend, validar, etc.
        setErrorInitOtp(false)
        setLoadOtp(true)

        try {

            const confirmOpt = await axios({ url: `${URL_SERVER}/confirm_opt`, method: "post", data: { otp: otpCode,token:tokenUpdataPass } })

            if (confirmOpt.data.verify) {
               

            } else {
                
                setLoadOtp(false)
                setShowFormOtp(false)
                setShowFormUpdatePass(true)

                window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))
                setErrorInitMessage(confirmOpt.data.mens)
                setErrorInitOtp(true)

            }
        } catch (error) {
            setLoadOtp(false)
            setErrorInitMessageOtp('Verifica tu conexion')
            setErrorInitOtp(true)
        }
    }




    const onSubmitRecepPassword = async (data) => {
        setErrorInitUpdatePass(false)
        console.log(data)
        if (data.password1 !== data.password2) {
            setErrorInitUpdatePass(true)
            setErrorInitMessageUpdatePass('Las contrasenas no coinsiden')

            return
        }


        try {

            setLoadUpdatePass(true)

            const logearse = await axios({ url: `${URL_SERVER}/login_post`, method: "post", data })
            console.log(logearse.data)

            if (logearse.data.verify) {

                setShowFormUpdatePass(false)
                setLoadUpdatePass(false)


            } else {
                
                setLoadUpdatePass(false)
                setErrorInitMessageUpdatePass(logearse.data.mens)
                setErrorInitUpdatePass(true)

            }

        } catch (error) {
            //console.log(error)
            setLoadUpdatePass(false)
            setErrorInitMessageUpdatePass('Verifica tu conexion')
            setErrorInitUpdatePass(true)
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

    ];

    const fieldsConfirmePass2 = [

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

    ];

    
    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem("enableTAdmins"))) {
        } else {
            window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
        }
    }, [])


    return (
        <>
            <Grid
                bgcolor="backgroundColorPage"
                sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
            >
                <Box sx={stylesForm}>
                    <RecetPassword
                        onSubmit={onSubmitSendEmali}
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                        fields={fields}
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
                    />

                </Box>

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
                                marginTop: 1
                                //fontSize: "12px",
                                //color: "#3e2723",
                            }}
                        >
                            Enviar otra vez el codigo
                        </LoadingButton>
                    </Typography>
                    <OtpInput length={6} onChange={setOtpCode} />
                    {errorInitOtp && (
                        <Box sx={{ width: "95%", mt: 2 }}>
                            <FormAlert message={errorInitMessageOtp} />
                        </Box>
                    )}
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        size='small'
                        color="primary"
                        onClick={handleSubmitOpt}
                        sx={{ mt: 3 }}
                        disabled={otpCode.length !== 6}
                    >
                        Verificar
                    </LoadingButton>
                </div>

                <Box sx={stylesForm}>
                    <PassworUpdate2
                        onSubmit={onSubmitRecepPassword}
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                        fields={fieldsConfirmePass2}
                        showPassword={showPassword}
                        togglePasswordVisibility={() => setShowPassword(!showPassword)}
                        errorInit={errorInitUpdatePass}
                        errorInitMessage={errorInitMessageUpdatePass}
                        loading={loadingUpdatePass}
                        buttonLabel="Actualizar Contraseña"
                        imageUrl=""
                        imageAlt="Global2a"
                        linkUrl=""
                        linkText=""
                    />

                </Box>
            </Grid>

        </>
    );
};

export default UpdatePassword;