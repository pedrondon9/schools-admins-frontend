import React, { useEffect, useState, useContext, useRef } from 'react'
import AppContext from '../../contexts/ServiceContext'
import { useNavigate } from 'react-router-dom'
import {
    URL_SERVER, DATA_USER
} from "../../contexts/constantesVar";
import 'animate.css';
import "../login/loginn.css"
import axios from 'axios'
import { Typography } from '@mui/material'
import { Box, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { textStyleP } from '../../components/form_components/styleForm'
import OtpInput from '../../components/form_components/form/OtpInput'
import FormAlert from '../../components/form_components/FormAlert'
import CacheDataOtp from '../../components/form_components/form_submit/cacheDataOtp';
import { handleSubmitOptF, onSubmitResendOTPF } from '../../components/form_components/form_submit/onSubmitOtp';





function RegistreConfirmOTP({ dataOTP, setDataOTP }) {



    const [loading, setLoad] = useState(false)//estado para activar el spinner del boton submit

    const [errorInitOtp, setErrorInitOtp] = useState(false)
    const [errorInitMessageOtp, setErrorInitMessageOtp] = useState('')
    const [otpCode, setOtpCode] = useState("");
    const [loadingOpt, setLoadOtp] = useState(false)

    const cacheKey = 'otpUpdatePass';



    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();



    const handleSubmitOpt = async () => {

        await handleSubmitOptF(setErrorInitOtp,otpCode,setDataOTP,setLoadOtp,setErrorInitMessageOtp,cacheKey)

        
    };

    //Funcion que se llama despues dpulsar el boton submit
    const onSubmitResendOTP = async (data) => {

        await onSubmitResendOTPF(setErrorInitOtp,setDataOTP,setLoad,setErrorInitMessageOtp,cacheKey)

    }


    useEffect(() => {
        try {

            CacheDataOtp(cacheKey, setDataOTP)

        } catch (error) {

        }


    }, [])

    return (
        <>

            {dataOTP?.confirmEmail === "1" ?
                <div style={{ textAlign: "", padding: 20 }}>
                    <Typography variant="p" align='left' sx={textStyleP}>Ingrese el código que hemos enviado en tu correo (tienes 2 minutos para ingresarlo)
                        <br />
                        <LoadingButton
                            component={LoadingButton}
                            loading={loading}
                            variant="outlined"
                            size='small'
                            color="primary"
                            onClick={onSubmitResendOTP}

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
                    {errorInitOtp && (
                        <Box sx={{ width: "95%", mt: 2 }}>
                            <FormAlert message={errorInitMessageOtp} />
                        </Box>
                    )}
                    <LoadingButton
                        loading={loadingOpt}
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

                :
                <></>

            }



        </>
    );
};

export default RegistreConfirmOTP;