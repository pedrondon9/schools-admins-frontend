import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
//fffde7
export const CardCourse = ({ x, modal }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Card sx={{ bgcolor: '#e0e0e0' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            2024-2025
          </Typography>
          <Typography
            color="#5900d6"
            variant="p"
            sx={{ height: 60, fontSize: 20, fontWeight: '600' }}
            component="div"
          >
            {x.courseName?.slice(0, 25)}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={x.open ? '#2e7d32' : '#880e4f'}>
            {x.open ? 'Abierto' : 'Cerrado'}
          </Typography>
          <Typography sx={{ mb: 1.5, height: 40, fontWeight: '500' }} variant="body2">
            {x.description?.slice(0, 100)}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            20 inscriones
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          {modal}
          <Button size="small" component={NavLink} to={`/course/${x._id}`}>
            Mas informacion
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
