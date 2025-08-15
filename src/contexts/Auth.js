import React, { useReducer } from 'react';
import AppContext from './ServiceContext';
import { InitialState } from './InitialState';
import AppReducer from './AppReducer';
import axios from 'axios';
import { URL_SERVER } from './constantesVar';

export default (props) => {
  const [state, dispatch, token] = useReducer(AppReducer, InitialState);

  /********* Axios config que contiene el token en el header */
  const AxiosConfigsToken = axios.create({
    baseURL: URL_SERVER,
  });

  AxiosConfigsToken.interceptors.request.use(config => {
    config.headers['x-access-token'] = state.dataUser.loginToken;
    return config;
  });

  /*
        AxiosConfigsToken.interceptors.response.use(
    
            response => {
    
                if (response.data.verificarToken) {
                    window.localStorage.setItem("enableTAdmins", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '', accI: [] }))
    
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
                } else {
                    //console.log('Renovendo')
                    RenoverToken()
                }
    
                //console.log(response, 'interceptor')
    
                return response
            }
        )
        /********* fin de axios config que contiene el token en el header 
    
    */

  /*********** FIN DE  VERIFICAR TOKEN ********/

  return (
    <AppContext.Provider
      value={{
        dispatch,

        AxiosConfigsToken,
        dataUser: state.dataUser,

        userId: state.dataUser.loginName,
        userName: state.dataUser.loginId,
        valideLogin: state.dataUser.login,

        titlePage: state.dataUser.titlePage,
        //userPhone: state.userPhone,
        loginToken: state.dataUser.loginToken,
        schoolTenant: state.dataUser.schoolTenant,
        schoolName: state.dataUser.schoolName,
        schoolLogo: state.dataUser.schoolLogo,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
