import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const Photo = ({ data }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        spacing={3}
        //bgcolor="backgroundColorPage"
        container
        sx={{ justifyContent: 'center', maxWidth: '1000px' }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ bgcolor: '#eee', width: '150px' }}>
              <CardMedia
                variant="outlined"
                component="img"
                sx={{ objectFit: 'cover', paddingTop: 0.5 }}
                image={data.imagen1}
                title={data.nombre}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Photo;
