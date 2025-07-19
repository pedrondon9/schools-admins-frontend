function CacheDataOtp(cacheKey, setDataOtp) {
  console.log('jdfhdsbfsd f sbfksjbf skfbsqfjbui');
  try {
    const cachedDataOtp = JSON.parse(window.localStorage.getItem(cacheKey))
      ? JSON.parse(window.localStorage.getItem(cacheKey))
      : null;

    const now = Date.now();

    if (cachedDataOtp !== null) {
      if (now < parseInt(cachedDataOtp.timeExpire)) {
        setDataOtp(cachedDataOtp);
        return;
      } else {
        window.localStorage.removeItem(cacheKey);
        setDataOtp({
          timeExpire: 0,
          token: '',
          confirmEmail: '0',
        });
        setErrorInitOtp(false);
        setErrorInitMessageOtp('');
        console.log('El OTP ha expirado o no existe. opt');
        setLoadOtp(false);
      }
    } else {
      window.localStorage.setItem(
        cacheKey,
        JSON.stringify({
          timeExpire: 0,
          token: '',
          confirmEmail: '0',
        })
      );
      setDataOtp({
        timeExpire: 0,
        token: '',
        confirmEmail: '0',
      });
    }
  } catch (error) {}
}

export default CacheDataOtp;
