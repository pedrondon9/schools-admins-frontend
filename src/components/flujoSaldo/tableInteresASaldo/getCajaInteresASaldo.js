import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetCajaInteresASaldo = async (id) => {
    const res = await axiosConfigs.get(`/obtener_interes_a_saldo_caja/${id}`)
    const data = res.data.data.docs

    //console.log(data,'ssss')
    return data
}