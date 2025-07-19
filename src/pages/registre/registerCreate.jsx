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
import { cacheKeyRegister } from '../../components/form_components/constantVariable';


function RegisterCreate({ setDataOTP, dataOTP, chooseForm }) {


    const { dispatch} = useContext(AppContext)

    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')
    const [arrayFiles, setArrayFiles] = useState('')

    const [showPassword, setShowPassword] = useState(false);


    const cacheKey = cacheKeyRegister;



    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();


    //Funcion que se llama despues dpulsar el boton submit
    const onSubmit = async (data) => {
        console.log(data, arrayFiles)
        //console.log(dataOTP)
        const cachedDataOtp = JSON.parse(window.localStorage.getItem(cacheKey)) ? JSON.parse(window.localStorage.getItem(cacheKey)) : null;


        if (cachedDataOtp) {
            setErrorInit(false)

            console.log("Datos del formulario:", data)

            try {

                const fs = new FormData()
                fs.append("arrayFiles", arrayFiles)
                fs.append("schoolData", JSON.stringify(data))
                fs.append("token", cachedDataOtp.token)

                setLoad(true)

                const registerPost = await axios({ url: `${URL_SERVER}/auth/create_first_admin_post`, method: "post",data: fs, headers: { "Content-Type": "multipart/form-data"}  })

                console.log(registerPost.data)
                if (registerPost.data.verify) {

                    let dataUsers = {
                        login: registerPost.data.userData.active,
                        loginId: registerPost.data.userData._id,
                        logo: registerPost.data.userData.logo,
                        loginName: registerPost.data.userData.fullname,
                        loginToken: registerPost.data.token,
                        schoolTenant: registerPost.data.token,
                        schoolName: registerPost.data.token,
                        schoolLogo: registerPost.data.token,
                    }

                    window.localStorage.setItem("enableTAdmins", JSON.stringify(dataUsers))
                    window.localStorage.removeItem(cacheKey);

                    //console.log(logearse)

                    setLoad(false)

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

                const messages = error.response?.data ? error.response.data.mens : 'Error al verificar el OTP'

                if (error.response?.data?.mens === 'token_expired') {
                    window.localStorage.setItem(cacheKey, JSON.stringify({
                        timeExpire: 0,
                        token: '',
                        confirmEmail: "0"
                    }));
                    setDataOTP({
                        timeExpire: 0,
                        token: '',
                        confirmEmail: "0"
                    });
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
                        setArrayFiles={setArrayFiles}
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                        fields={fieldCreate}
                        showPassword={showPassword}
                        togglePasswordVisibility={() => setShowPassword(!showPassword)}
                        errorInit={errorInit}
                        errorInitMessage={errorInitMessage}
                        loading={loading}
                        buttonLabel="Registrar"
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

export default RegisterCreate;