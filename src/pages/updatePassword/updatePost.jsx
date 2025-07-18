import React, { useEffect, useState, useContext, useRef } from 'react'
import AppContext from '../../contexts/ServiceContext'
import {
    URL_SERVER,
} from "../../contexts/constantesVar";
import 'animate.css';
import "../login/loginn.css"
import axios from 'axios'

import { useForm } from 'react-hook-form';
import RegistreForm from "../../components/form_components/form/RegistreForm"
import ExternalLink from '../../components/form_components/ExternalLink'

import { fieldEmail, fields } from '../../components/form_components/arrayFields'
import OnSubmit from '../../components/form_components/form_submit/onSubmitForm';
import CacheDataOtp from '../../components/form_components/form_submit/cacheDataOtp';
import { cacheKeyUpdatePassword } from '../../components/form_components/constantVariable';





function RegistrePost({ setDataOTP, dataOTP, chooseForm }) {


    const { } = useContext(AppContext)

    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false);


    const cacheKey = cacheKeyUpdatePassword;



    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();


    //Funcion que se llama despues dpulsar el boton submit
    const onSubmit = async (data) => {

        if (chooseForm === "a") {
            await OnSubmit(data,'update_pass/send_otp', setLoad, setErrorInitMessage, setErrorInit, setDataOTP,cacheKey)
        }

    }


    useEffect(() => {
        try {

            CacheDataOtp(cacheKey,setDataOTP)

        } catch (error) {

        }

    }, [])

    return (
        <>

            {dataOTP?.confirmEmail === "0" ?
                <>
                    <RegistreForm
                        onSubmit={onSubmit}
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                        fields={fieldEmail}
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

        </>
    );
};

export default RegistrePost;