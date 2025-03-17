import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetEnviosTodos = async () => {
    const res = await axiosConfigs.get('/envios_todos')
    const data = res.data
    return data
}
export const GetEnviosCajaMaster = async (userId,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtenerEnviosCancelados/${userId}`)
    const data = res.data.data.docs
    return data
}