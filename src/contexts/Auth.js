import React, { useReducer } from 'react';
import AppContext from './ServiceContext';
import { InitialState } from './InitialState';
import AppReducer from './AppReducer';
import axios from 'axios';
import { DATA_EDIT_COURSE, ESPECILITIES_EDIT_ID, EVENT_EDIT_ID, URL_SERVER } from './constantesVar';
import { Get } from '../components/users/get';

export default (props) => {
  const [state, dispatch, token] = useReducer(AppReducer, InitialState);
  const [courseId, setCourseId] = React.useState(null);
  const [loadingCourseId, setLoadingCourseId] = React.useState(false);
  const [loadingEventId, setLoadingEventId] = React.useState(false);
  const [loadingEspecilitiesId, setLoadingEspecilitiesId] = React.useState(false);
  /********* Axios config que contiene el token en el header */
  const AxiosConfigsToken = axios.create({
    baseURL: URL_SERVER,
  });

  AxiosConfigsToken.interceptors.request.use(config => {
    config.headers['x-access-token'] = state.dataUser.loginToken;
    config.headers["x-tenant-id"] =  state.dataUser.schoolTenant;
    return config;
  });

  const getWithId = async (url, select) => {
    //let id = url.split('/')[2]
    if (select === 'especialities') {
      setLoadingEspecilitiesId(true)

    }
    if (select === 'course') {
      setLoadingCourseId(true)

    }
    if (select === 'events') {
      setLoadingEventId(true)

    }
    try {
      const response = await Get(AxiosConfigsToken, url);
      if (response.success) {
        
        console.log(response, 'response especialitiesId');
        if (select === 'especialities') {
          dispatch({
            type: ESPECILITIES_EDIT_ID,
            payload: response.response?.docs[0]
          })
        }
        if (select === 'course') {
          dispatch({
            type: DATA_EDIT_COURSE,
            payload: response.response?.docs[0]
          })
        }
        if (select === 'events') {
          dispatch({
            type: EVENT_EDIT_ID,
            payload: response.response?.docs[0]
          })
        }


      } else {
        if (select === 'especialities') {
          dispatch({
            type: ESPECILITIES_EDIT_ID,
            payload: null
          })
        }
        if (select === 'course') {
          dispatch({
            type: DATA_EDIT_COURSE,
            payload: null
          })
        }
        if (select === 'events') {
          dispatch({
            type: EVENT_EDIT_ID,
            payload: null
          })
        }
      }
    } catch (error) {
      if (select === 'especialities') {
        dispatch({
          type: ESPECILITIES_EDIT_ID,
          payload: null
        })
      }
      if (select === 'course') {
        dispatch({
          type: DATA_EDIT_COURSE,
          payload: null
        })
      }
      if (select === 'events') {
        dispatch({
          type: EVENT_EDIT_ID,
          payload: null
        })
      }
    } finally {
      if (select === 'especialities') {
        setLoadingEspecilitiesId(false)

      }
      if (select === 'course') {
        setLoadingCourseId(false)

      }
      if (select === 'events') {
        setLoadingEventId(false)

      }

    }
  }

 

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
        dataEditUser: state.dataEditUser,
        userId: state.dataUser.loginName,
        userName: state.dataUser.loginId,
        valideLogin: state.dataUser.login,

        titlePage: state.dataUser.titlePage,
        //userPhone: state.userPhone,
        loginToken: state.dataUser.loginToken,
        schoolTenant: state.dataUser.schoolTenant,
        schoolName: state.dataUser.schoolName,
        schoolLogo: state.dataUser.schoolLogo,
        courseCategory: state.courseCategory,

        editCourseId: state.editCourseId,// data del curso seleccionado
        loadingCourseId,// estado de carga del curso seleccionado
        loadingEspecilitiesId,
        editEventId: state.editEventId,
        editEspecialitiesId: state.editEspecialitiesId,
        getWithId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
