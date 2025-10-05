import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { TITLEPAGE, URL_SERVER } from '../../contexts/constantesVar';

import { Box, Grid, Toolbar, Typography } from '@mui/material';
import { CardDasboard } from '../../components/cardDasboard';
import { Title } from '../../components/textTitle/title';
import { set } from 'date-fns';
import SkeletonColum from '../../components/skelholder/skelethonColum';
import SkeletonTable from '../../components/skelholder/skelethonTable';

function Homes() {
  const { dispatch, AxiosConfigsToken } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const getData = async () => {
    try {
      setSpinner(true);
      const response = await AxiosConfigsToken.get('/dasboard/get');
      console.log(response);

      if (response.data.success) {
        setData(response.data.response);
      } else {
        setData(null);
      }
    } catch (error) {
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    getData();
    if (JSON.parse(window.localStorage.getItem('enableTAdmins'))) {
    } else {
      window.localStorage.setItem(
        'enableTAdmins',
        JSON.stringify({
          valor: false,
          valorI: '',
          nameI: '',
          typeI: '',
          phoneI: '',
        })
      );
    }
    dispatch({
      type: TITLEPAGE,
      payload: 'INICIO',
    });
    //Veri()
  }, []);

  return (
    <div>
      <Toolbar />
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
      {!spinner ? (
        <>
          {data ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container spacing={2} sx={{ paddingTop: 3 }}>
                <CardDasboard title={'Admins'} cantities={data.admin} />
                <CardDasboard title={'Estudiantes'} cantities={data.student} />
                <CardDasboard title={'Profesores'} cantities={data.teacher} />
                <CardDasboard title={'Cursos'} cantities={data.courses} />
                <CardDasboard title={'Especialidades'} cantities={data.specialities} />
                <CardDasboard title={'Publicaciones'} cantities={data.events} />
              </Grid>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <SkeletonTable />
      )}
    </div>
  );
}

export default Homes;
