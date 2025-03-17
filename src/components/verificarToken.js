import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AppContext from '../contexts/ServiceContext'
import { ID_USER, NAME_USER, PHONE_USER, TOKEN, TYPE_USER, VALIDE_USER } from '../contexts/constantesVar'
import axios from 'axios'
import axiosConfigs from './axiosConfig'
const valideLoginCache = JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).valor : false
const tokenn = JSON.parse(window.localStorage.getItem("enableTAdmins")) ? JSON.parse(window.localStorage.getItem("enableTAdmins")).tokI : ""

export async function VerificarToken() {
    const { Logins, dispatch, errorResponseLogin, userError, Registers, userName, userId, valideLogin ,token } = useContext(AppContext)

    const response = await axiosConfigs({ url: `/verificar_token_new`, method: "post", data: {
        token:token
    }})

    //console.log(response.data)

    if (response.data.verifivar) {

    } else {

        //console.log(response.data)

        window.localStorage.setItem("enableTAdmins", JSON.stringify({
            valor: false,
            valorI: "",
            nameI: "",
            typeI: "",
            phoneI: "",
            porceI: "",
            accI: [],
            tokI:""
        }))
        dispatch({
            type: VALIDE_USER,
            payload: false
        })
        dispatch({
            type: NAME_USER,
            payload: ""
        })

        dispatch({
            type: ID_USER,
            payload: ""
        })
        dispatch({
            type: TYPE_USER,
            payload: ""
        })
        dispatch({
            type: PHONE_USER,
            payload: ""
        })
        dispatch({
            type: TOKEN,
            payload: ""
        })
    }

}

