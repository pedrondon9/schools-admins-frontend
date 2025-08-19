

const ErrorG = (error, setErrorInitMessage, cacheKey, setDataOTP, setErrorInitOtp) => {
    console.log(error)
    
    if (error.response?.status === 400) {
        setErrorInitMessage(error.response?.data?.message);
        setErrorInitOtp(true)

        return
    }

    if (error.response?.status === 403) {

        setErrorInitMessage(error.response?.data?.message);
        setErrorInitOtp(true)
        return

    }
    if (error.response?.status === 405) {

        window.localStorage.setItem(
            cacheKey,
            JSON.stringify({
                timeExpire: 0,
                token: '',
                confirmEmail: '0',
            })
        );
        setDataOTP({
            timeExpire: 0,
            token: '',
            confirmEmail: '0',
        });
        setErrorInitMessage('');
        setErrorInitOtp(true)
        return



    }

    if (error.request) {
        // No hubo respuesta del servidor
        setErrorInitMessage('No se pudo conectar con el servidor.');
        setErrorInitOtp(true)
        return

    } else {
        // Otro error
        setErrorInitMessage('Error desconocido.');
        setErrorInitOtp(true)
        return

    }
}

module.exports = {
    ErrorG
}