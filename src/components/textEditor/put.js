
export const Put = async (AxiosConfigsToken,setLoad,data,id,toast,selected) => {
    // Aquí puedes manejar el envío del contenido del editor
    setLoad(true);
    if (!data) {
        toast.error("La descripcion no puede estar vacia");
        setLoad(false);
        return;
    }
    try {
        const sendData = await AxiosConfigsToken({
            url: `/${selected}/put`,
            method: 'put',
            data
        });

        if (sendData.data.success) {
            toast.success(`${sendData.data.message}`);
        } else {
            toast.error(`${sendData.data.message}`);
        }
    } catch (error) {

    } finally {
        setLoad(false);
    }

}