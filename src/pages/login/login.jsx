import React, { useEffect, useState, useContext, useRef } from 'react'
import AppContext from '../../contexts/ServiceContext'
import { useNavigate } from 'react-router-dom'
import {  DATA_USER, ID_USER, NAME_USER, PHONE_USER,TOKEN,  URL_SERVER, VALIDE_USER } from "../../contexts/constantesVar";
import 'animate.css';
import "./loginn.css"
import axios from 'axios'
import { Box, Grid } from '@mui/material';
import { AccountCircle} from '@mui/icons-material'
import { useForm } from 'react-hook-form';
import KeyIcon from '@mui/icons-material/Key';
import ExternalLink from '../../components/form_components/ExternalLink'
import { stylesForm } from '../../components/form_components/styleForm'
import RegistreForm from '../../components/form_components/form/RegistreForm'




function Login() {

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
        //console.log(data)


        try {
            setLoad(true)

            const logearse = await axios({ url: `${URL_SERVER}/login_post`, method: "post", data })
            console.log(logearse.data)



            if (logearse.data.verify) {
                let dataUsers = {
                    login: confirmOpt.data.userData.active,
                    loginId: confirmOpt.data.userData._id,
                    logo: confirmOpt.data.userData.logo,
                    loginName: confirmOpt.data.userData.fullname,
                    loginToken: confirmOpt.data.token,
                    schoolTenant: confirmOpt.data.token,
                    schoolName: confirmOpt.data.token,
                    schoolLogo: confirmOpt.data.token,
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

                dispatch({
                    type: DATA_USER,
                    payload: dataUsers
                })
               

                window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))
                setErrorInitMessage(logearse.data.mens)
                setErrorInit(true)
                setLoad(false)

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
            name: "nombre",
            label: "Usuario",
            type: "text",
            validation: { required: "Campo requerido" },
            startIcon: <AccountCircle />,
        },
        {
            name: "contrasena",
            label: "Contraseña",
            type: "password",
            validation: { required: "Campo requerido" },
            startIcon: <KeyIcon />,
        },
    ];
    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem("enableTAdmins"))) {
        } else {
            window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', emailI: '' }))
        }
    }, [])

    return (

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

                <ExternalLink url={"/signUp"} text={"Si todavia no tienes una cuenta crea tu cuenta"} />
                <ExternalLink url={"/updatepass"} text={"Y Si no recuerdas tu contrasenas, la puedes recuperar"} />
            </Box>
        </Grid>
    );
};

export default Login;
