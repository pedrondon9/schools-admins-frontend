
/**
 * Proveedor de contexto para la aplicación que maneja el estado global y las configuraciones de Axios.
 *
 * @param {Object} props - Propiedades pasadas al componente.
 * @returns {JSX.Element} Proveedor de contexto que envuelve los componentes hijos.
 *
 * @property {Function} dispatch - Función para despachar acciones al reducer.
 * @property {Object} AxiosConfigsToken - Instancia de Axios configurada con los encabezados necesarios.
 * @property {Object} dataUser - Información del usuario autenticado.
 * @property {Object} dataEditUser - Información del usuario en edición.
 * @property {string} userName - Nombre de usuario del usuario autenticado.
 * @property {string} userId - ID del usuario autenticado.
 * @property {boolean} valideLogin - Estado de autenticación del usuario.
 * @property {string} titlePage - Título de la página actual.
 * @property {string} loginToken - Token de autenticación del usuario.
 * @property {string} schoolTenant - Identificador del tenant de la escuela.
 * @property {string} schoolName - Nombre de la escuela.
 * @property {string} schoolLogo - Logo de la escuela.
 * @property {Array} courseCategory - Categorías de cursos disponibles.
 * @property {Object} editCourseId - Datos del curso seleccionado para edición.
 * @property {boolean} loadingCourseId - Estado de carga del curso seleccionado.
 * @property {boolean} loadingEspecilitiesId - Estado de carga de especialidades.
 * @property {boolean} loadingEditStudent - Estado de carga de edición de estudiante.
 * @property {Object} editEventId - Datos del evento seleccionado para edición.
 * @property {Object} editEspecialitiesId - Datos de la especialidad seleccionada para edición.
 * @property {Object} dataUserSelected - Datos del usuario seleccionado.
 * @property {Function} getWithId - Función para obtener datos por ID desde un endpoint específico.
 */
import React, { useReducer } from 'react';
import AppContext from './ServiceContext';
import { InitialState } from './InitialState';
import AppReducer from './AppReducer';
import axios from 'axios';
import {
  DATA_EDIT_COURSE,
  EDIT_STUDENT,
  ESPECILITIES_EDIT_ID,
  EVENT_EDIT_ID,
  URL_SERVER,
  USER_SELECTED,
} from './constantesVar';
import { Get } from '../components/users/get';

export default (props) => {
  const [state, dispatch, token] = useReducer(AppReducer, InitialState);
  const [courseId, setCourseId] = React.useState(null);
  const [loadingCourseId, setLoadingCourseId] = React.useState(false);
  const [loadingEventId, setLoadingEventId] = React.useState(false);
  const [loadingEditStudent, setLoadingEditStudent] = React.useState(false);
  const [loadingEspecilitiesId, setLoadingEspecilitiesId] = React.useState(false);
  /********* Axios config que contiene el token en el header */
  const AxiosConfigsToken = axios.create({
    baseURL: URL_SERVER,
  });

  AxiosConfigsToken.interceptors.request.use((config) => {
    config.headers['x-access-token'] = state.dataUser.loginToken;
    config.headers['x-tenant-id'] = state.dataUser.schoolTenant;
    return config;
  });

  const getWithId = async (url, select) => {
    //let id = url.split('/')[2]
    if (select === 'especialities') {
      setLoadingEspecilitiesId(true);
    }
    if (select === 'course') {
      setLoadingCourseId(true);
    }
    if (select === 'events') {
      setLoadingEventId(true);
    }
    if (select === 'student') {
      setLoadingEditStudent(true);
    }
    try {
      const response = await Get(AxiosConfigsToken, url);
      if (response.success) {
        console.log(response, 'response especialitiesId');
        if (select === 'especialities') {
          dispatch({
            type: ESPECILITIES_EDIT_ID,
            payload: response.response?.docs[0],
          });
        }
        if (select === 'course') {
          dispatch({
            type: DATA_EDIT_COURSE,
            payload: response.response?.docs[0],
          });
        }
        if (select === 'events') {
          dispatch({
            type: EVENT_EDIT_ID,
            payload: response.response?.docs[0],
          });
        }

        if (select === 'user') {
          dispatch({
            type: USER_SELECTED,
            payload: response.response?.docs[0],
          });
        }
      } else {
        if (select === 'especialities') {
          dispatch({
            type: ESPECILITIES_EDIT_ID,
            payload: null,
          });
        }
        if (select === 'course') {
          dispatch({
            type: DATA_EDIT_COURSE,
            payload: null,
          });
        }
        if (select === 'events') {
          dispatch({
            type: EVENT_EDIT_ID,
            payload: null,
          });
        }
        if (select === 'user') {
          dispatch({
            type: USER_SELECTED,
            payload: null,
          });
        }
      }
    } catch (error) {
      if (select === 'especialities') {
        dispatch({
          type: ESPECILITIES_EDIT_ID,
          payload: null,
        });
      }
      if (select === 'course') {
        dispatch({
          type: DATA_EDIT_COURSE,
          payload: null,
        });
      }
      if (select === 'events') {
        dispatch({
          type: EVENT_EDIT_ID,
          payload: null,
        });
      }

      if (select === 'user') {
        dispatch({
          type: USER_SELECTED,
          payload: null,
        });
      }
    } finally {
      if (select === 'especialities') {
        setLoadingEspecilitiesId(false);
      }
      if (select === 'course') {
        setLoadingCourseId(false);
      }
      if (select === 'events') {
        setLoadingEventId(false);
      }

      if (select === 'student') {
        setLoadingEditStudent(false);
      }
    }
  };

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

        editCourseId: state.editCourseId, // data del curso seleccionado
        loadingCourseId, // estado de carga del curso seleccionado
        loadingEspecilitiesId,
        loadingEditStudent,
        editEventId: state.editEventId,
        editEspecialitiesId: state.editEspecialitiesId,
        dataUserSelected: state.dataUserSelected,

        getWithId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
