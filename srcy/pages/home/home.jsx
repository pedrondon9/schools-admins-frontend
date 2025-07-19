import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { TITLEPAGE, URL_SERVER } from '../../contexts/constantesVar';

import { Box, Grid } from '@mui/material';

function Homes() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem('enableTAdmins'))) {
    } else {
      window.localStorage.setItem(
        'enableTAdmins',
        JSON.stringify({ valor: false, valorI: '', nameI: '', typeI: '', phoneI: '' })
      );
    }
    dispatch({
      type: TITLEPAGE,
      payload: 'INICIO',
    });
    //Veri()
  }, []);

  return (
    <>
      <Grid spacing={1} bgcolor="backgroundColorPage" container></Grid>
    </>
  );
}

export default Homes;
