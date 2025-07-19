import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import ModalUpdate from './users/modalUpdate';
//#ede8f7 f3f0f8
export const CardAdmin = ({ x, modal }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ bgcolor: '#e0e0e0' }}>
        <CardMedia
          variant="outlined"
          component="img"
          sx={{ height: 150, objectFit: 'contain', paddingTop: 0.5 }}
          image={x.imagen1}
          title={x.nombre}
        />
        <CardContent>
          <Typography
            sx={{ height: 30, fontWeight: '700' }}
            color="#0d47a1"
            gutterBottom
            variant="h7"
            component="div"
          >
            {x.roles ? x.roles[0].name : ''}
          </Typography>
          <Typography
            sx={{ mb: 1, fontWeight: '600' }}
            color="#6200ea"
            gutterBottom
            variant="body2"
            component="div"
          >
            {x.nombre?.slice(0, 20)}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: '500' }} color="body2">
            Telefono: {x.contact} <br />{' '}
            {x.active ? (
              <span style={{ color: '#2e7d32' }}>Activado</span>
            ) : (
              <span style={{ color: 'red' }}>Desctivado</span>
            )}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>{modal}</CardActions>
      </Card>
    </Box>
  );
};
