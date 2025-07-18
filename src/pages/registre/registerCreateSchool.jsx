import React, { useEffect, useState, useContext, useRef } from 'react'
import AppContext from '../../contexts/ServiceContext'
import {
    DATA_USER,
    URL_SERVER,
} from "../../contexts/constantesVar";
import 'animate.css';
import "../login/loginn.css"
import axios from 'axios'

import { useForm } from 'react-hook-form';
import RegistreForm from "../../components/form_components/form/RegistreForm"
import ExternalLink from '../../components/form_components/ExternalLink'

import { fieldCreate, fields, fieldUpdatePassword } from '../../components/form_components/arrayFields'
import CacheDataOtp from '../../components/form_components/form_submit/cacheDataOtp';


function RegisterCreateSchool({ setDataOTP, dataOTP, chooseForm }) {


    const { } = useContext(AppContext)

    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false);


    const cacheKey = 'otpCodeCache';



    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();


    //Funcion que se llama despues dpulsar el boton submit
    const onSubmit = async (data) => {
        console.log(data)
        console.log(dataOTP)


        if (chooseForm === "bs") {
            setErrorInit(false)

            console.log("Datos del formulario:", data)

            try {

                setLoad(true)

                const registerPost = await axios({ url: `${URL_SERVER}/auth/create_first_admin_post`, method: "post", data })

                if (registerPost.data.verify) {

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
                    window.localStorage.removeItem(cacheKey);

                    //console.log(logearse)

                    setLoadOtp(false)

                    dispatch({
                        type: DATA_USER,
                        payload: dataUsers
                    })

                    navigate("/")


                    setLoad(false)
                    setErrorInitMessage(registerPost.data.mens)
                    setErrorInit(true)
                    setDataOTP(dataOtp);

                } else {

                    setLoad(false)
                    setErrorInitMessage(registerPost.data.mens)
                    setErrorInit(true)

                }

            } catch (error) {
                console.log(error, 'error')

                const messages = error.response.data ? error.response.data.mens : 'Error al verificar el OTP'

                if (error.response.data.mens === null) {
                    setErrorInit(true)
                    setErrorInitMessage('')

                } else {
                    setErrorInit(true)
                    setErrorInitMessage(messages)
                }
                setLoad(false)
            }
        }


    }




    useEffect(() => {
        try {

            CacheDataOtp(cacheKey, setDataOTP)

        } catch (error) {
            console.error("Error en useEffect de OTP:", error);
        }
    }, []);


    return (
        <>

            {dataOTP?.confirmEmail === "2" ?
                <>
                    <RegistreForm
                        onSubmit={onSubmit}
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                        fields={fieldUpdatePassword}
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
                </>
                :
                <></>
            }

        </>
    );
};

export default RegisterCreateSchool;