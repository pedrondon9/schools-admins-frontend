import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ModalUpdate from './users/modalUpdate';
import { School } from '@mui/icons-material';
//#ede8f7 f3f0f8
export const CardDasboard = ({ title, cantities }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            boxShadow: 1,
            borderRadius: 3,
            "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
          }}
        >

          <CardContent sx={{ textAlign: "center" }}>
            <School fontSize="large" color="primary" />
            <Typography variant="h6" sx={{ mt: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {cantities}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};
