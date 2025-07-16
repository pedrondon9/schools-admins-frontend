import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AppContext from '../contexts/ServiceContext'
import axiosConfigs from './axiosConfig'

function Protected({ isAlloweb, children }) {
  const { dataUser } = useContext(AppContext)

  if (!dataUser.login) {
    return <Navigate to="/signIn" replace />
  }
  return children
}

export default Protected