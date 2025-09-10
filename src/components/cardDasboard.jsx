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
//#ede8f7 f3f0f8
export const CardDasboard = ({ title, cantities }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            //boxShadow: 'none',
            //borderBottom: '1px #e0e0e0 solid',
            //borderRadius: '0px',
            border: '2px solid rgb(63, 63, 63)',
            backgroundColor: "#fff3e0"
          }}
        >
          <CardContent sx={{ padding: '0px' }}>
            <Typography
              className="title-event"
              sx={{ marginBlock: 2,bgcolor: '#FCF5EB', textAlign: "center", fontSize: { xs: "1.3rem", md: "1.2rem" }, fontWeight: '700' }}
              gutterBottom
              component="div"

            >
              {title}
            </Typography>
            <Typography
              className="title-event"
              sx={{ marginBlock: 2,bgcolor: '#FCF5EB', textAlign: "center", fontSize: { xs: "3.5rem", md: "3rem" }, fontWeight: '700' }}
              gutterBottom
              component="div"

            >
              { cantities}
            </Typography>


          </CardContent>

        </Card>
      </Box>
    </Grid>
  );
};
