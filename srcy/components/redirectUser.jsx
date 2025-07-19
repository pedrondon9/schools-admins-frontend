import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../contexts/ServiceContext';
import axiosConfigs from './axiosConfig';

function RedirectUser({ isAlloweb, children }) {
  const { dataUser } = useContext(AppContext);
  const enable = window.localStorage.getItem('enableT');
  axiosConfigs.interceptors.response.use((response) => {
    return response;
  });

  if (dataUser.login) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default RedirectUser;
