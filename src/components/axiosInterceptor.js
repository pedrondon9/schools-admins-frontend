import { useContext } from "react"
import AppContext from "../contexts/ServiceContext"
import axiosConfigs from "./axiosConfig"
const valideLoginCache = JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).valor : false
const tokenn = JSON.parse(window.localStorage.getItem("enableTAdmins")) ?`${JSON.parse(window.localStorage.getItem("enableTAdmins")).tokI}`  : ""


const  Interceptors = () =>{ 

    axiosConfigs.interceptors.response.use(

    response => {
  
        if (response.data.verificar) {
            console.log('ok funciona')
            
        } else {
            
        }
  
        return response
    }
  )
}

export default Interceptors