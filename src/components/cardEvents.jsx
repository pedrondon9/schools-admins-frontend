import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import ModalUpdate from './users/modalUpdate'
//#ede8f7 f3f0f8
export const CardEvents = ({ x, modal }) => {
    return (
        <Box sx={{ width: "100%" }}>

                <Card sx={{ bgcolor: "transparent", boxShadow: 'none', borderBottom: "1px #e0e0e0 solid", borderRadius: "0px" }}>
                    <CardMedia
                        //variant='outlined'
                        component="img"
                        sx={{ objectFit: "contain" }}
                        image={x.imagenURL}
                        title={x.titulo}
                    />
                    <CardContent sx={{ padding: "0px", marginTop: '10px' }}>
                        <Typography className="title-event" sx={{ marginBlock: 2 }} gutterBottom variant="h5" component="div">
                            {x.titulo.slice(0, 70)}...
                        </Typography>
                        <Typography  className="content-event" sx={{ mb: 1 }} gutterBottom variant="p" component="div">
                            {x.contenido.slice(0, 100)}...
                        </Typography>

                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="small" component={NavLink} to={`/info_event/${x._id}`} >Mas</Button>
                    </CardActions>
                </Card>
        </Box>
    )
}
