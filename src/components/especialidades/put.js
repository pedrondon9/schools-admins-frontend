
export const putCourse = async (AxiosConfigsToken,setLoad,value,id,toast) => {
    // Aquí puedes manejar el envío del contenido del editor
    setLoad(true);
    if (!value) {
        toast.error("La descripcion no puede estar vacia");
        setLoad(false);
        return;
    }
    try {
        const sendData = await AxiosConfigsToken({
            url: `/especialities/put`,
            method: 'put',
            data: { description: value, id: id },
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

// export const putCourse = async (AxiosConfigsToken,setLoad,value,id,toast) => {
//     // Aquí puedes manejar el envío del contenido del editor
