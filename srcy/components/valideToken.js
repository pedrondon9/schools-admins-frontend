import React from 'react';
import { ID_USER, NAME_USER, PHONE_USER, TYPE_USER, VALIDE_USER } from '../contexts/constantesVar';
import AppContext from '../contexts/ServiceContext';
export function ValideToken(data) {
  const { userId, dispatch, typeUser, valideLogin } = React.useContext(AppContext);

  console.log(data, 'valideToken');
  if (data.mens) {
    if (data.mens === 'ss') {
      window.localStorage.setItem(
        'enableTAdmins',
        JSON.stringify({ valor: false, valorI: '', nameI: '', typeI: '', phoneI: '' })
      );

      dispatch({
        type: VALIDE_USER,
        payload: false,
      });
      dispatch({
        type: NAME_USER,
        payload: '',
      });

      dispatch({
        type: ID_USER,
        payload: '',
      });

      dispatch({
        type: TYPE_USER,
        payload: '',
      });
      dispatch({
        type: PHONE_USER,
        payload: '',
      });
    } else {
    }
  } else {
  }
}
