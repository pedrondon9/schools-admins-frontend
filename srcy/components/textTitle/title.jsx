import { Grid, Typography } from '@mui/material';
import React from 'react';

export const Title = ({ title }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <Grid sx={{ justifyContent: 'center', maxWidth: '1000px' }}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </Grid>
    </div>
  );
};
