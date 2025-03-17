import axios from "axios"
import axiosConfigs from "../axiosConfig"



export const Get = async (AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get('/get_event')
    const data = res.data.data
    //console.log(res,'sssssssss')
    return data
}