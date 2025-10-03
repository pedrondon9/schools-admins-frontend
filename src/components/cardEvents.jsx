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
export const CardEvents = ({ x, modal, urlId }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
         
        }}
      >


        <CardMedia
          component="img"
          height="160"
          image={
            x?.courseImg
              ? x?.courseImg
              : x?.linkPhoto
                ? x?.linkPhoto
                : 'https://visament.com/front/images/home/upload_user.png'
          }
          title={x?.title} alt={x.title}
          sx={{ objectFit: "contain",mt:1 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {x.title}
          </Typography>




          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {x.brief_description}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="text" sx={{fontWeight:"bold"}} size="large" component={NavLink} to={`/${urlId}/${x?._id}`}>
            Mas info
          </Button>
        </CardActions>

      </Card>
    </Box>
  );
};
