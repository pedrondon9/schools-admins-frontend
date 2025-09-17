import { Grid, Typography } from '@mui/material';
import React from 'react';

export const Title = ({ title }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <Grid sx={{ justifyContent: 'center', maxWidth: '1000px' }}>
        <Typography
          variant="h2"
          component="h2"
          color={'#212121'}
          sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
        >
          {title}
        </Typography>
      </Grid>
    </div>
  );
};
