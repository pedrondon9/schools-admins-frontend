import { Grid, Typography } from '@mui/material';
import React from 'react';

export const Title = ({ title }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <Grid sx={{ justifyContent: 'center', maxWidth: '1000px' }}>
        <Typography variant="h6" component="h6" color={'#212121'}>
          {title}
        </Typography>
      </Grid>
    </div>
  );
};
