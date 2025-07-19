import React, { useContext, useEffect, useState } from 'react';
import DataCard from '../../components/events/dataCard';
import ModalAdd from '../../components/events/modalAdd';
import { Title } from '../../components/textTitle/title';
import AppContext from '../../contexts/ServiceContext';
import useSWR from 'swr';
import SkeletonTable from '../../components/skelholder/skelethonTable';
import { Get } from './get';
import { useParams } from 'react-router-dom';
import { Box, CardMedia, Grid, Typography } from '@mui/material';
import FormUpdate from '../../components/events/formUpdate';
import ModalUpdate from '../../components/events/modalUpdate';

export const EventId = () => {
  const { id } = useParams();

  const { AxiosConfigsToken } = useContext(AppContext);

  const [event, setEvent] = useState([]);
  const { data, error, isLoading } = useSWR('getEventId', () => Get(AxiosConfigsToken, id), {});

  console.log(data, '11111111111');

  useEffect(() => {
    //getStudent()
  }, []);

  if (isLoading) return <SkeletonTable />;

  if (error) return <></>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <Grid
        spacing={3}
        //bgcolor="backgroundColorPage"
        container
        sx={{ maxWidth: '1000px' }}
      >
        <ModalUpdate dataUp={data} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ width: '100%' }}>
            <Typography className="title-notice" variant="h2" component="div">
              {data.titulo}
            </Typography>
          </Box>
          <Box sx={{ width: '100%', marginBlock: 3 }}>
            <img src={data.imagenURL} alt="" style={{ objectFit: 'contain', paddingTop: 0.5 }} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography className="title-contenido" variant="p" component="div">
              {data.contenido}
            </Typography>
          </Box>
          {data.contenido1 ? (
            <Box sx={{ width: '100%', marginTop: 5 }}>
              <Typography className="title-contenido" variant="p" component="div">
                {data.contenido1}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
          {data.contenido2 ? (
            <Box sx={{ width: '100%', marginTop: 5 }}>
              <Typography className="title-contenido" variant="p" component="div">
                {data.contenido2}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
          {data.contenido3 ? (
            <Box sx={{ width: '100%', marginTop: 5 }}>
              <Typography className="title-contenido" variant="p" component="div">
                {data.contenido3}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
