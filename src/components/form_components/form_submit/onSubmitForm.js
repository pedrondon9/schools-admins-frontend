import axios from 'axios';
import { DATA_USER, URL_SERVER } from '../../../contexts/constantesVar';
import { ErrorG } from '../../errorGestion';

export const OnSubmit = async (
    data,
    path,
    setLoad,
    setErrorInitMessage,
    setErrorInit,
    setDataOTP,
    cacheKey = '',
    navigate,

) => {

    setErrorInit(false);

    console.log(data)

    try {
        setLoad(true);

        const registerPost = await axios({
            url: `${URL_SERVER}/${path}`,
            method: 'post',
            data,
        });

        if (path === 'auth/update_password') {

            if (registerPost.data.verify) {
                console.log(registerPost.data);

                let dataOtp = {
                    timeExpire: 0, // 2 minuto en milisegundos
                    token: "",
                    confirmEmail: "0",
                };

                window.localStorage.removeItem(cacheKey);

                setLoad(false);
                setErrorInitMessage("");
                setErrorInit(true);
                setDataOTP(dataOtp);
                navigate('/');

            } else {
                console.log(registerPost)
                setLoad(false);
                setErrorInitMessage(registerPost.data.mens);
                setErrorInit(true);
            }



            return
        }


        if (registerPost.data.verify) {
            console.log(registerPost.data);

            let dataOtp = {
                timeExpire: Date.now() + 10 * 60 * 1000, // 2 minuto en milisegundos
                token: registerPost.data.token,
                confirmEmail: '1',
            };

            window.localStorage.setItem(cacheKey, JSON.stringify(dataOtp));

            setLoad(false);
            setErrorInitMessage(registerPost.data.mens);
            setErrorInit(true);
            setDataOTP(dataOtp);

            navigate('/');

        } else {
            console.log(registerPost)
            setLoad(false);
            setErrorInitMessage(registerPost.data.mens);
            setErrorInit(true);
        }

    } catch (error) {

        ErrorG(error, setErrorInitMessage, cacheKey, setDataOTP, setErrorInit)

        setErrorInit(true);
        setLoad(false);
    }
};

export const OnSubmitRegister = async (
    data,
    cacheKey,
    setErrorInit,
    setLoad,
    setErrorInitMessage,
    setDataOTP,
    arrayFiles,
    navigate,
    dispatch
) => {
    console.log(data, arrayFiles);

    const cachedDataOtp = JSON.parse(window.localStorage.getItem(cacheKey))
        ? JSON.parse(window.localStorage.getItem(cacheKey))
        : null;

        console.log(cachedDataOtp,'cache otp')

    if (cachedDataOtp) {
        setErrorInit(false);

        console.log('Datos del formulario:', data);

        try {
            const fs = new FormData();
            fs.append('arrayFiles', arrayFiles);
            fs.append('schoolData', JSON.stringify(data));
            fs.append('token', cachedDataOtp.token);

            setLoad(true);

            const registerPost = await axios({
                url: `${URL_SERVER}/auth/create_first_admin_post`,
                method: 'post',
                data: fs,
                headers:{
                    'x-access-token':cachedDataOtp.token,
                    'Content-Type': 'multipart/form-data'
                },
            });

            console.log(registerPost.data);
            if (registerPost.data.verify) {
                let dataUsers = {
                    login: registerPost.data.userData.isActive,
                    loginId: registerPost.data.userData._id,
                    logo: registerPost.data.userData?.logo,
                    loginName: registerPost.data.userData?.email,
                    loginEmail: registerPost.data.userData?.email,
                    loginToken: registerPost.data.token,
                    schoolTenant: registerPost.data.userData?.school[0]?._id,
                    schoolName: registerPost.data.userData?.school[0]?.name,
                    schoolLogo: registerPost.data.userData?.school[0]?.logo,
                };


                window.localStorage.setItem('enableTAdmins', JSON.stringify(dataUsers));
                window.localStorage.removeItem(cacheKey);

                //console.log(logearse)

                setLoad(false);

                dispatch({
                    type: DATA_USER,
                    payload: dataUsers,
                });

                navigate('/');

                setLoad(false);
                setErrorInitMessage(registerPost.data.message);
                setErrorInit(true);
                setDataOTP(dataOtp);
            } else {
                setLoad(false);
                setErrorInitMessage(registerPost.data.message);
                setErrorInit(true);
            }
        } catch (error) {

            ErrorG(error, setErrorInitMessage, cacheKey, setDataOTP, setErrorInit)

            setErrorInit(true);
            setLoad(false);
        }
    }
};
