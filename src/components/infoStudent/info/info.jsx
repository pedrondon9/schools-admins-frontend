import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const InfoP = ({ data }) => {
  const date = new Date(data.birthdate).toLocaleDateString('es-es');
  const dateCreate = new Date(data.createdAt).toLocaleDateString('es-es');
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        spacing={3}
        //bgcolor="backgroundColorPage"
        container
        sx={{ justifyContent: 'center', maxWidth: '1000px' }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid sx={{ width: '100%', display: 'flex', marginTop: 4 }}>
            <Box sx={{ width: '49%', marginRight: 0.2 }}>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Nombre:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Apellidos:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Fecha de nacimiento:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                DNI/Pasaporte:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Sexo:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Telefono:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Correo:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Del distrito de:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Pueblo/comunidad:
              </Typography>

              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Fecha de registro:
              </Typography>
              <Typography
                color="#6200ea"
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'right',
                }}
              >
                Codigo:
              </Typography>
            </Box>
            <Box sx={{ width: '49%', marginLeft: 0.2 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.name2}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {date}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.dni}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.sex}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.phone?.slice(0, 3)} {data.phone?.slice(3, 6)} {data.phone?.slice(6, 9)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.city}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.adresse}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {dateCreate}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: '500',
                  fontSize: 15,
                  textAlign: 'left',
                }}
                color="body2"
              >
                {data.codeStudent}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default InfoP;
