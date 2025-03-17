import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AppContext from '../contexts/ServiceContext'
import axiosConfigs from './axiosConfig'

function Protected({ isAlloweb, children }) {
  const { Logins, dispatch, errorResponseLogin, userError, Registers, userName, userId, valideLogin } = useContext(AppContext)
  const enable = window.localStorage.getItem("enableT")


  if (!valideLogin) {
    return <Navigate to="/signIn" replace />
  }
  return children
}

export default Protected