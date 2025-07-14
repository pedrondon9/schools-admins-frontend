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
import { stylesForm } from '../../components/form_components/styleForm'




function UpdatePassword() {

    const navigate = useNavigate();

    const { Logins, dispatch, errorResponseLogin, userError, Registers, userName, userId } = useContext(AppContext)

    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false);


    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    //Funcion que se llama despues dpulsar el boton submit
    const onSubmit = async (data) => {
        setErrorInit(false)
        console.log(data)
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
                let dataUsers = {
                    valor: logearse.data.validarLogin,
                    valorI: logearse.data.userData._id,
                    nameI: logearse.data.userData.nombre,
                    emailI: logearse.data.userData.contact,
                    tokI: logearse.data.token,
                }
                window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))

                //console.log(logearse)

                setLoad(false)

                dispatch({
                    type: DATA_USER,
                    payload: dataUsers
                })



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
        if (JSON.parse(window.localStorage.getItem("enableTAdmins"))) {
        } else {
            window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
        }
    }, [])

    return (
        <>
            <Grid
                bgcolor="backgroundColorPage"
                sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}
            >
                <Box sx={stylesForm}>
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
                </Box>
            </Grid>

        </>
    );
};

export default UpdatePassword;