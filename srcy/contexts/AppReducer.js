import React, { useContext, useState } from 'react';
import { TITLEPAGE, DATA_USER } from './constantesVar';

const AppReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case TITLEPAGE:
      return {
        ...state,
        titlePage: payload,
      };

    case DATA_USER:
      console.log(payload);
      return {
        ...state,
        dataUser: {
          ...state.dataApp,
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default AppReducer;
