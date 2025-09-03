import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import ModalUpdate from './users/modalUpdate';
//#ede8f7 f3f0f8
export const CardEvents = ({ x, modal,urlId }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Card
        sx={{
          //boxShadow: 'none',
          //borderBottom: '1px #e0e0e0 solid',
          //borderRadius: '0px',
          border: '2px solid rgb(63, 63, 63)',
          padding: "10px",
          backgroundColor:"#fff3e0"
        }}
      >
        <CardMedia
          //variant='outlined'
          component="img"
          sx={{ objectFit: 'contain', height: { xs: 100, md: 100 } }}
          image={x?.courseImg ? x?.courseImg : 'https://res.cloudinary.com/mumbex/image/upload/v1660494910/logo1_ffq1qu.png'}
          title={x?.title}

        />
        <CardContent sx={{ padding: '0px', marginTop: '10px',          bgcolor: '#FCF5EB' }}>
          <Typography
            className="title-event"
            sx={{ marginBlock: 2,fontSize: { xs: "2rem", md: "1.5rem" }, fontWeight: '700' }}
            gutterBottom
            component="div"

          >
            {x?.title?.slice(0, 70)}...
          </Typography>
          <div
            style={{
              fontWeight: '600',
            }}

            dangerouslySetInnerHTML={ { __html: x.description?.substring(0, 80) }}
          />
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' size="large" component={NavLink} to={`/${urlId}/${x?._id}`}>
            Ver curso
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
