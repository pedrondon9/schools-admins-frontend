import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetRecargasTodos = async () => {
    const res = await axiosConfigs.get('/todas_las_recargas')
    const data = res.data.data.docs
    //console.log(data)
    return data
}
export const GetRecargasCaja = async (userId) => {
    const res = await axiosConfigs.get(`/obtener_recargas_por_id_caja/${userId}`)
    const data = res.data.data.docs
    return data
}