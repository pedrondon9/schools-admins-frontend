import axios from "axios";
import { URL_SERVER } from "../../../contexts/constantesVar";


export const  handleSubmitOptF = async (setErrorInitOtp,otpCode,setDataOTP,setLoadOtp,setErrorInitMessageOtp,cacheKey)=> {

    const Otp = JSON.parse(window.localStorage.getItem(cacheKey))

    setErrorInitOtp(false)
    setLoadOtp(true)

    try {

        const confirmOpt = await axios({ url: `${URL_SERVER}/auth/confir_opt_register_post`, method: "post", data: { otp: otpCode, token: Otp.token } })

        console.log(confirmOpt.data, "verify otp")

        if (confirmOpt.data.verify) {

            const cachedDataOtp = JSON.parse(window.localStorage.getItem(cacheKey)) ? JSON.parse(window.localStorage.getItem(cacheKey)) : null;
            if (cachedDataOtp) {
                cachedDataOtp.confirmEmail = "2"
            }


            window.localStorage.setItem(cacheKey, JSON.stringify(cachedDataOtp));
            setDataOTP(cachedDataOtp)


            setLoadOtp(false)


        } else {

            setLoadOtp(false)
            setErrorInitMessageOtp(confirmOpt.data.mens)
            setErrorInitOtp(true)

        }
    } catch (error) {
        console.log(error)
        const messages = error.response?.data ? error.response.data.mens : 'Error al verificar el OTP'

        if (error.response?.data?.mens === null) {
            setErrorInitOtp(true)
            setErrorInitMessageOtp('')

        } else {
            setErrorInitOtp(true)
            setErrorInitMessageOtp(messages)
        }
        setLoadOtp(false)

    }
};




//Funcion que se llama despues dpulsar el boton submit
export const onSubmitResendOTPF = async (setErrorInitOtp,setDataOTP,setLoad,setErrorInitMessageOtp,cacheKey)=> {

    try {
        const Otp = JSON.parse(window.localStorage.getItem(cacheKey))

        setLoad(true)

        const registerPost = await axios({ url: `${URL_SERVER}/auth/resend_otp`, method: "post", data: { otp: Otp } })

        if (registerPost.data.verify) {
            console.log(registerPost.data)

            let dataOtp = {
                timeExpire: Date.now() + 10 * 60 * 1000, // 2 minuto en milisegundos
                token: registerPost.data.token,
                confirmEmail: "1",
            }

            window.localStorage.setItem(cacheKey, JSON.stringify(dataOtp))

            setLoad(false)
            setErrorInitMessageOtp(registerPost.data.mens)
            setErrorInitOtp(true)
            setDataOTP(dataOtp);

        } else {

            setLoad(false)
            setErrorInitMessageOtp(registerPost.data.mens)
            setErrorInitOtp(true)

        }

    } catch (error) {
        console.log(error, 'error')

        const messages = error.response?.data ? error.response.data.mens : 'Error al verificar el OTP'

        if (error.response?.data?.mens === null) {
            setErrorInitOtp(true)
            setErrorInitMessageOtp('')

        } else {
            if (messages === "token_expired") {
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
            } else {

                setErrorInitOtp(true)
                setErrorInitMessageOtp(messages)
            }
        }
        setLoad(false)
    }

}